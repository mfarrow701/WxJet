// @flow
import {getMoonIllumination} from 'suncalc';

/**
 * Generates a random hash code
 * @returns {string}: The random hash code
 */
export function generateRandomHash() {
    return Math.random().toString(36).substring(7);
}

/**
 * Generates a random hex code
 * @returns {string}: The random hex code
 */
export function generateRandomHexCode() {
    let value, grayScale;
    value = Math.random() * 0xFF | 0;
    grayScale = (value << 16) | (value << 8) | value;
    return '#' + grayScale.toString(16);
    // return '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
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

/**
 *
 * @param date
 * @returns {*}
 */
export function getLunarPhase(date) {
    const lunarIllumination = getMoonIllumination(date),
        lunarPhase = Math.round(lunarIllumination.phase * 28) / 28,
        lunarLuminosity = Math.round(lunarIllumination.fraction * 100);

    if (lunarPhase === 0 || lunarPhase === 1) return {
        img: 'newMoon',
        phase: 'New moon',
        luminosity: lunarLuminosity
    };
    if (lunarPhase > 0 && lunarPhase < 0.25) return {
        img: 'waxingCrescent',
        phase: 'Waxing crescent',
        luminosity: lunarLuminosity
    };
    if (lunarPhase === 0.25) return {
        img: 'firstQuarter',
        phase: 'First quarter',
        luminosity: lunarLuminosity
    };
    if (lunarPhase > 0.25 && lunarPhase < 0.5) return {
        img: 'waxingGibbous',
        phase: 'Waxing gibbous',
        luminosity: lunarLuminosity
    };
    if (lunarPhase === 0.5) return {
        img: 'fullMoon',
        phase: 'Full moon',
        luminosity: lunarLuminosity
    };
    if (lunarPhase > 0.5 && lunarPhase < 0.75) return {
        img: 'waningGibbous',
        phase: 'Waning gibbous',
        luminosity: lunarLuminosity
    };
    if (lunarPhase === 0.75) return {
        img: 'thirdQuarter',
        phase: 'Third quarter',
        luminosity: lunarLuminosity
    };
    if (lunarPhase > 0.75 && lunarPhase < 1) return {
        img: 'waningCrescent',
        phase: 'Waning crescent',
        luminosity: lunarLuminosity
    };
}