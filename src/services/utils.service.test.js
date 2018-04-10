import React from 'react';
import {isNullOrUndefined, generateRandomHexCode, generateRandomNumberBetweenValues} from './utils.service';

describe('Utils service', () => {

    it('should determine if a value is null or undefined', () => {
        expect(isNullOrUndefined(null)).toEqual(true);
        expect(isNullOrUndefined(undefined)).toEqual(true);
        expect(isNullOrUndefined({})).toEqual(false);
        expect(isNullOrUndefined(1234)).toEqual(false);
        expect(isNullOrUndefined([])).toEqual(false);
        expect(isNullOrUndefined('Test')).toEqual(false);
        expect(isNullOrUndefined(true)).toEqual(false);
    });

    it('should generate a random hex colour', () => {
        spyOn(Math, 'random').and.returnValue(0.7);
        expect(generateRandomHexCode()).toEqual('#b33332');
    });

    it('should generate a random number between two values', () => {
        spyOn(Math, 'random').and.returnValue(0.7);
        expect(generateRandomNumberBetweenValues(-1000, 0)).toEqual(-300);
        expect(generateRandomNumberBetweenValues(-100, 0)).toEqual(-30);
        expect(generateRandomNumberBetweenValues(-10, 0)).toEqual(-3);
        expect(generateRandomNumberBetweenValues(-1, 0)).toEqual(0);
        expect(generateRandomNumberBetweenValues(0, 0)).toEqual(0);
        expect(generateRandomNumberBetweenValues(0, 1)).toEqual(1);
        expect(generateRandomNumberBetweenValues(0, 10)).toEqual(7);
        expect(generateRandomNumberBetweenValues(0, 100)).toEqual(70);
        expect(generateRandomNumberBetweenValues(0, 1000)).toEqual(700);
        expect(generateRandomNumberBetweenValues(7, 7)).toEqual(7);
    });
});
