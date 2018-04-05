import React from 'react';
import {all, takeLatest} from 'redux-saga/effects';
import rootSaga from './root.saga';
import {forecastAPIGenerator} from './forecast.saga';
import {locationsAPIGenerator} from './locations.saga';
import {FORECAST_API_REQUEST} from '../actions/forecast.actions';
import {LOCATIONS_API_REQUEST} from '../actions/location.actions';

describe('Root saga', () => {
    let generator;

    beforeEach(() => {
        generator = rootSaga();
    });

    it('should have a defined generator', () => {
        expect(generator).toBeDefined();
    });

    it.only('should yield an effect from the root saga', () => {
        expect(generator.next().value).toEqual(all([takeLatest(LOCATIONS_API_REQUEST, locationsAPIGenerator), takeLatest(FORECAST_API_REQUEST, forecastAPIGenerator)]))
    });
});