// @flow

export function generateRandomHexCode() {
    return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
}

export function isNullOrUndefined(value) {
    return value == null;
}