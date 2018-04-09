import React from 'react';
import {call, put} from 'redux-saga/effects';
import {forecastAPIGenerator} from './forecast.saga';
import * as forecastService from '../services/forecast.service';
import {
    forecastAPISuccess,
    forecastAPIFailure,
    forecastAPIRequest
} from '../actions/forecast.actions';
import {selectedLocation} from '../core/mocks/location';

describe('Forecast saga', () => {

    forecastService.fetchForecast = jest.fn();
    let generator;

    beforeEach(() => {
        generator = forecastAPIGenerator(forecastAPIRequest(selectedLocation));
    });

    it('should have a defined generator', () => {
        expect(generator).toBeDefined();
    });

    it('should yield an effect from a successful API call', () => {
        expect(generator.next().value).toEqual(call(forecastService.fetchForecast, selectedLocation));
        expect(generator.next().value).toEqual(put(forecastAPISuccess()));
    });

    it('should yield an effect from an un-successful API call', () => {
        expect(generator.next().value).toEqual(call(forecastService.fetchForecast, selectedLocation));
        expect(generator.throw().value).toEqual(put(forecastAPIFailure()));
    });
});