import React from 'react';
import {call, put} from 'redux-saga/effects';
import {locationsAPIGenerator} from './locations.saga';
import * as locationsService from '../services/locations.service';
import {
    locationAPISuccess,
    locationAPIFailure
} from '../actions/location.actions';

describe('Locations saga', () => {

    locationsService.fetchLocations = jest.fn();
    let generator;

    beforeEach(() => {
        generator = locationsAPIGenerator();
    });

    it('should have a defined generator', () => {
        expect(generator).toBeDefined();
    });

    it('should yield an effect from a successful API call', () => {
        expect(generator.next().value).toEqual(call(locationsService.fetchLocations));
        expect(generator.next().value).toEqual(put(locationAPISuccess()));
    });

    it('should yield an effect from an un-successful API call', () => {
        expect(generator.next().value).toEqual(call(locationsService.fetchLocations));
        expect(generator.throw().value).toEqual(put(locationAPIFailure()));
    });
});