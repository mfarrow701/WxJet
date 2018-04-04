import React from 'react';
import {isNullOrUndefined, generateRandomHexCode} from './utils.service';

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
        spyOn(Math, 'random').and.returnValue(7);
        expect(generateRandomHexCode()).toEqual('#6fffff9');
    })
});
