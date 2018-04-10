// @flow

/**
 * Generates a random hex code
 * @returns {string}: The random hex code
 */
export function generateRandomHexCode() {
    return '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
}

/**
 * Generates a random number between two provided values
 * @param {number} min: The min value
 * @param {number} max: The max value
 * @returns {number}: The random number
 */
export function generateRandomNumberBetweenValues(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Determines if a value is either null or undefined
 * @param {any} value: Any value
 * @returns {boolean}: Is null or undefined
 */
export function isNullOrUndefined(value) {
    return value == null;
}