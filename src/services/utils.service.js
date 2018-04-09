// @flow

export function generateRandomHexCode() {
    return '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
}

export function generateRandomNumberBetweenValues(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function isNullOrUndefined(value) {
    return value == null;
}