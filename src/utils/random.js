// Seedable random number generator functions

/**
 * Cyrb128 hash function for generating a seed from a string
 * @param {string} str - The string to hash
 * @returns {Array} An array of four 32-bit values
 */
function cyrb128(str) {
    let h1 = 1779033703,
        h2 = 3144134277,
        h3 = 1013904242,
        h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    (h1 ^= h2 ^ h3 ^ h4), (h2 ^= h1), (h3 ^= h1), (h4 ^= h1);
    return [h1 >>> 0, h2 >>> 0, h3 >>> 0, h4 >>> 0];
}

/**
 * Splitmix32 algorithm for generating random numbers
 * @param {number} a - The seed value
 * @returns {Function} A function that returns a random number between 0 and 1
 */
function splitmix32(a) {
    return function () {
        a |= 0;
        a = (a + 0x9e3779b9) | 0;
        let t = a ^ (a >>> 16);
        t = Math.imul(t, 0x21f0aaad);
        t = t ^ (t >>> 15);
        t = Math.imul(t, 0x735a2d97);
        return ((t = t ^ (t >>> 15)) >>> 0) / 4294967296;
    };
}

/**
 * Creates a random number generator with a given seed
 * @param {string} seed - The seed string
 * @returns {Function} A function that returns a random number between 0 and 1
 */
const randomNumberGenerator = (seed) => {
    const [a, b, c, d] = cyrb128(seed);
    const sfc32 = splitmix32(a);
    return sfc32;
};

/**
 * Generates a random color in hex format
 * @returns {string} A random color in hex format
 */
const generateRandomColor = () => {
    const RNG = randomNumberGenerator("oranges");
    const hue = RNG() * 360;
    const saturation = 0.8 + RNG() * 0.2; // between 0.8 and 1
    const value = 0.5 + RNG() * 0.5; // between 0.5 and 1

    // Convert HSV to RGB
    const c = value * saturation;
    const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
    const m = value - c;

    let r, g, b;
    if (hue < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (hue < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (hue < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (hue < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (hue < 300) {
        r = x;
        g = 0;
        b = c;
    } else {
        r = c;
        g = 0;
        b = x;
    }

    // Convert to hex
    const toHex = (n) =>
        Math.round((n + m) * 255)
            .toString(16)
            .padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/**
 * Calculates a random number within a range
 * @param {number} min - The minimum value
 * @param {number} max - The maximum value
 * @returns {number} A random number between min and max
 */
const calculateRandomRange = (min, max) => {
    const RNG = randomNumberGenerator("oranges");
    return Math.floor(RNG() * (max - min + 1)) + min;
};

/**
 * Calculates the price per minute
 * @param {number} duration - The duration in seconds
 * @param {number} price - The price
 * @returns {number|null} The price per minute or null if invalid
 */
const calculatePricePerMin = (duration, price) => {
    const durationMin = parseInt(duration) / 60;
    const priceNum = parseFloat(price);
    if (isNaN(durationMin) || isNaN(priceNum) || durationMin === 0) return null;
    return parseFloat((priceNum / durationMin).toFixed(2));
};

export {
    generateRandomColor,
    randomNumberGenerator,
    calculatePricePerMin,
    calculateRandomRange,
}; 