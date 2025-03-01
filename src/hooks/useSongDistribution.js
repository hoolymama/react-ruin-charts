import { useMemo } from "react";
import { SILENCE_POLICIES } from "../utils/constants";

/**
 * Creates a packer that places songs along a timeline based on a difficulty curve.
 * For each song, finds the optimal position where the difficulty value is highest. The
 * algorithm ensures no songs overlap by maintaining a list of available gaps.
 *
 * When a song is placed, the gaps are updated by either splitting them, truncating them,
 * or removing them entirely. This gap-tracking system provides efficient space management
 * by only checking valid positions where songs could potentially fit. Songs that cannot
 * fit in any remaining gaps are skipped.
 *
 * NOTE: The difficulty curve is represented by discrete, evenly spaced difficulty values.
 * Even though the difficulty curve may be displayed as a smooth curve for aesthetic reasons,
 * we use linear interpolation to find the difficulty value at any given point.
 *
 * @param {number} totalDuration - Total duration of the timeline
 * @param {Array<number>} difficultyValues - Array of difficulty values representing
 *                                          the difficulty curve over the timeline
 * @returns {Object} Packer object with pack() method
 */
const DifficultyPacker = (totalDuration, difficultyValues, silencePolicy) => {
    // Private variables
    const spacing = totalDuration / (difficultyValues.length - 1);

    // Private utility functions
    /**
     * Performs linear interpolation to find the difficulty value at any point along the timeline.
     * Since difficulty values are only defined at discrete control points, this function
     * interpolates between the two nearest control points to estimate the difficulty at
     * arbitrary positions.
     *
     * @param {number} x - The position along the timeline to find the difficulty value for
     * @returns {number} The interpolated difficulty value at position x
     */
    const linearLookup = (x) => {
        const leftIndex = Math.floor(x / spacing);

        if (leftIndex >= difficultyValues.length - 1)
            return difficultyValues[difficultyValues.length - 1];
        if (leftIndex < 0) return difficultyValues[0];

        const y1 = difficultyValues[leftIndex];
        const y2 = difficultyValues[leftIndex + 1];
        const t = (x - leftIndex * spacing) / spacing;

        return y1 + (y2 - y1) * t;
    };

    /**
     * Finds the coordinate with the highest difficulty value within a given gap.
     *
     * The gap may or may not have control points in it.
     * If it has no control points between the min and max x values, then we only need to find which of those two points has the highest difficulty value.
     *
     * If it does have control points between the min and max x values, then we also need to check the control points between the min and max x values since the curve in that gap may be shaped like a house roof.
     *
     * @param {Object} song - Song object containing duration property
     * @param {Object} gap - Object with start and end times defining available space
     * @returns {Object} Coordinate object {x, y} with highest difficulty value (y) and its position (x)
     */
    const findBestCoordInGap = (song, gap) => {
        const songCenter = song.duration / 2;
        const minX = gap.start + songCenter;
        const maxX = gap.end - songCenter;

        const startIndex = Math.max(0, Math.floor(minX / spacing));
        const endIndex = Math.min(
            difficultyValues.length - 1,
            Math.ceil(maxX / spacing)
        );

        const coords = [
            { x: minX, y: linearLookup(minX) },
            ...Array.from({ length: endIndex - startIndex + 1 }, (_, i) => {
                const x = (startIndex + i) * spacing;
                return x >= minX && x <= maxX
                    ? { x, y: difficultyValues[startIndex + i] }
                    : null;
            }).filter(Boolean),
            { x: maxX, y: linearLookup(maxX) },
        ];

        return coords.reduce(
            (best, coord) => (coord.y > best.y ? coord : best),
            coords[0]
        );
    };

    /**
     * Reconfigures the array of gaps to accommodate a newly placed song.
     * This function handles various cases of how a song placement can affect existing gaps:
     * - Song completely outside gap: Gap remains unchanged
     * - Song exactly fills gap: Gap is removed
     * - Song splits gap into two: Original gap is replaced with two smaller gaps
     * - Song partially fills gap from start: Gap is shortened from start
     * - Song partially fills gap from end: Gap is shortened from end
     *
     * @param {Object} placedSong - The song that was just placed, with startTime and duration
     * @param {Array<Object>} gaps - Array of existing gaps, each with start and end times
     * @returns {Array<Object>} New array of gaps after accommodating the placed song
     */
    const calculateGaps = (placedSong, gaps) => {
        const songStart = placedSong.startTime;
        const songEnd = songStart + placedSong.duration;

        return gaps.reduce((newGaps, gap) => {
            if (songEnd <= gap.start || songStart >= gap.end) {
                newGaps.push(gap);
                return newGaps;
            }
            if (songStart === gap.start && songEnd === gap.end) {
                return newGaps;
            }
            if (songStart > gap.start && songEnd < gap.end) {
                newGaps.push(
                    { start: gap.start, end: songStart },
                    { start: songEnd, end: gap.end }
                );
                return newGaps;
            }
            if (songStart <= gap.start && songEnd < gap.end) {
                newGaps.push({ start: songEnd, end: gap.end });
                return newGaps;
            }
            if (songStart > gap.start && songEnd >= gap.end) {
                newGaps.push({ start: gap.start, end: songStart });
                return newGaps;
            }
            return newGaps;
        }, []);
    };

    /**
     * Attempts to place a single song within available gaps based on difficulty values.
     * First filters gaps to only those that can fit the song's duration. Then for each
     * candidate gap, finds the position where the difficulty value is highest at the
     * song's center point, and uses the highest of all the candidate gaps.
     *
     * Returns the song object with an added startTime property positioned at the
     * overall best difficulty value, or null if no valid position is found.
     *
     * @param {Object} song - Song object with duration property
     * @param {Array<{start: number, end: number}>} gaps - Array of available gaps
     * @returns {Object|null} Song object with added startTime property, or null if no valid position
     */
    const placeSong = (song, gaps) => {
        const candidateGaps = gaps.filter(
            (gap) => gap.end - gap.start >= song.duration
        );
        if (candidateGaps.length === 0) return null;

        let bestCoord = { x: 0, y: -1 };
        candidateGaps.forEach((gap) => {
            const bestCoordInGap = findBestCoordInGap(song, gap);
            if (bestCoordInGap.y > bestCoord.y) {
                bestCoord = bestCoordInGap;
            }
        });
        if (bestCoord.y === -1) return null;

        return {
            ...song,
            startTime: bestCoord.x - song.duration / 2,
        };
    };

    const applySilencePolicy = resultSongs => {
        const totalSongDuration = resultSongs.reduce((acc, song) => acc + song.duration, 0);
        const spacing = (totalDuration - totalSongDuration) / (resultSongs.length - 1);
        let currentStartTime = 0;

        switch (silencePolicy) {
            case SILENCE_POLICIES.DISTRIBUTE: {
                return resultSongs.map(song => {
                    const startTime = currentStartTime;
                    currentStartTime += song.duration + spacing;
                    return { ...song, startTime };
                });
            }
            case SILENCE_POLICIES.STACK_FROM_START: {
                return resultSongs.map(song => {
                    const startTime = currentStartTime;
                    currentStartTime += song.duration;
                    return { ...song, startTime };
                });
            }
            default:
                return resultSongs;
        }
    };

    // Public interface
    return {
        pack: (songs) => {
            const resultSongs = [];
            let gaps = [{ start: 0, end: totalDuration }];
            songs.forEach((song) => {
                const placedSong = placeSong(song, gaps);
                if (placedSong) {
                    resultSongs.push(placedSong);
                    gaps = calculateGaps(placedSong, gaps);
                }
            });
            // sort based on startTime
            resultSongs.sort((a, b) => a.startTime - b.startTime);
            return applySilencePolicy(resultSongs);
        },
    };
};

/**
 * Memoized hook to distribute songs across a timeline based on specified parameters.
 *
 * @param {Array} songs - Array of song objects
 * @param {number} totalDuration - Total duration of the timeline
 * @param {string} packingMethod - The method to use for packing songs
 * @param {string} packingPriority - The priority to use for sorting
 * @param {Array<number>} difficultyValues - Array of difficulty values
 * @returns {Array} Array of song objects with added startTime properties
 */
export const useSongDistribution = (
    songs,
    totalDuration,
    difficultyValues,
    silencePolicy
) => {
    return useMemo(() => {
        if (!songs?.length || !totalDuration) return [];

        // Create copy of songs and remember original index
        let songsToProcess = songs.map((song, index) => ({
            ...song,
            originalIndex: index,
        })).sort((a, b) => b.pricePerMin - a.pricePerMin);

        const packer = DifficultyPacker(totalDuration, difficultyValues, silencePolicy);
        return packer.pack(songsToProcess);
    }, [
        songs,
        totalDuration,
        difficultyValues,
        silencePolicy
    ]);
}; 
