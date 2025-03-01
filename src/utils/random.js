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
 * Creates a RandomNumber object with methods for generating random numbers and colors
 * @param {string} [seed] - The seed string. If not provided, a seed will be generated from the current time.
 * @returns {Object} An object with methods for generating random numbers and colors
 */
function RandomNumber(seed) {
    // If no seed is provided, generate one from the current time
    if (seed === undefined) {
        const now = new Date();
        seed = `time-${now.getTime()}-${now.getMilliseconds()}`;
    }

    // Initialize the RNG with the seed
    const [a, b, c, d] = cyrb128(seed);
    const rng = splitmix32(a);

    // Return an object with methods
    return {
        /**
         * Generates a random number within a specified range
         * @param {Object} options - Options for generating the random number
         * @param {number} [options.min=0] - The minimum value (inclusive)
         * @param {number} [options.max=1] - The maximum value (inclusive)
         * @returns {number} A random number between min and max
         */
        inRange: function (options = {}) {
            const { min = 0, max = 1 } = options;

            if (min === 0 && max === 1) {
                return rng();
            }
            return min + rng() * (max - min);
        },

        /**
         * Generates a random integer within a specified range
         * @param {Object} options - Options for generating the random integer
         * @param {number} [options.min=0] - The minimum value (inclusive)
         * @param {number} [options.max=100] - The maximum value (inclusive)
         * @returns {number} A random integer between min and max
         */
        intInRange: function (options = {}) {
            const { min = 0, max = 100 } = options;
            return Math.floor(this.inRange({ min, max: max + 0.999999 }));
        },

        /**
         * Generates a random color in hex format with customizable HSV ranges
         * @param {Object} options - Options for generating the random color
         * @param {number} [options.minHue=0] - Minimum hue value (0-360)
         * @param {number} [options.maxHue=360] - Maximum hue value (0-360)
         * @param {number} [options.minValue=0] - Minimum value/brightness (0-1)
         * @param {number} [options.maxValue=1] - Maximum value/brightness (0-1)
         * @param {number} [options.minSaturation=0] - Minimum saturation (0-1)
         * @param {number} [options.maxSaturation=1] - Maximum saturation (0-1)
         * @returns {string} A random color in hex format
         */
        colorHex: function (options = {}) {
            const {
                minHue = 0,
                maxHue = 360,
                minValue = 0,
                maxValue = 1,
                minSaturation = 0,
                maxSaturation = 1
            } = options;

            const hue = this.inRange({ min: minHue, max: maxHue });
            const saturation = this.inRange({ min: minSaturation, max: maxSaturation });
            const value = this.inRange({ min: minValue, max: maxValue });

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
        }
    };
}

// Export for ES Modules
export { RandomNumber as default };

// Export for CommonJS
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = { default: RandomNumber };
} 