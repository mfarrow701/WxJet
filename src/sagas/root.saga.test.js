import React from 'react';
import {takeLatest} from 'redux-saga/effects';
import rootSaga from './root.saga';
import {forecastAPIGenerator} from './forecast.saga';
import {locationsAPIGenerator} from './locations.saga';
import {FORECAST_API_REQUEST} from '../actions/forecast.actions';
import {LOCATIONS_API_REQUEST} from '../actions/location.actions';

describe.skip('Root saga', () => {
    let generator;

    beforeEach(() => {
        generator = rootSaga();
    });

    it('should have a defined generator', () => {
        expect(generator).toBeDefined();
    });

    it('should yield an effect from the forecast API generator', () => {
        expect(generator.next().value).toEqual(takeLatest(FORECAST_API_REQUEST, forecastAPIGenerator))
    });

    it('should yield an effect from the locations API generator', () => {
        expect(generator.next().value).toEqual(takeLatest(LOCATIONS_API_REQUEST, locationsAPIGenerator))
    });
});