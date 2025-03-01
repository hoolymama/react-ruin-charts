/**
 * Formats a time value in seconds to either a timecode (HH:MM:SS) or seconds format
 * @param {number} seconds - The time in seconds
 * @param {string} timeUnit - The format to use ('timecode' or 'sec')
 * @returns {string} The formatted time
 */
export const formatTime = (seconds, timeUnit) => {
    if (timeUnit === 'timecode') {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return seconds.toFixed(2);
}; 