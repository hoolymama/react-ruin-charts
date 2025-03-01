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

/**
 * Calculates the price per minute
 * @param {number} duration - The duration in seconds
 * @param {number} price - The price
 * @returns {number|null} The price per minute or null if invalid
 */
export const calculatePricePerMin = (duration, price) => {
    const durationMin = parseInt(duration) / 60;
    const priceNum = parseFloat(price);
    if (isNaN(durationMin) || isNaN(priceNum) || durationMin === 0) return null;
    return parseFloat((priceNum / durationMin).toFixed(2));
}; 