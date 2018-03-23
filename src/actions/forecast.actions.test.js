import React from 'react';
import {
    FORECAST_API_REQUEST,
    FORECAST_API_SUCCESS,
    FORECAST_API_FAILURE,
    forecastAPIRequest,
    forecastAPIFailure,
    forecastAPISuccess
} from './forecast.actions';
import {successful, failure} from '../core/mocks/forecast';

describe('Forecast actions', () => {

    it('should have a series of define weather action types', () => {
        expect(FORECAST_API_REQUEST).toEqual('FORECAST_API_REQUEST');
        expect(FORECAST_API_SUCCESS).toEqual('FORECAST_API_SUCCESS');
        expect(FORECAST_API_FAILURE).toEqual('FORECAST_API_FAILURE');
    });

    it('should have a defined request action', () => {
        const mockPayload = null;
        expect(forecastAPIRequest(mockPayload)).toEqual({
            'payload': null,
            'type': FORECAST_API_REQUEST,
        })
    });

    it('should have a defined success action', () => {
        expect(forecastAPISuccess(successful)).toEqual({
            'payload': successful,
            'type': FORECAST_API_SUCCESS,
        })
    });

    it('should have a defined failure action', () => {
        expect(forecastAPIFailure(failure)).toEqual({
            'payload': failure,
            'type': FORECAST_API_FAILURE,
        })
    });

});