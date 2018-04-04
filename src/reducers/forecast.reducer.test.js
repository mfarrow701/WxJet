import React from 'react';
import {handleForecastAPIActions} from './forecast.reducer';
import {FORECAST_API_FAILURE, FORECAST_API_SUCCESS, FORECAST_API_REQUEST} from '../actions/forecast.actions';
import {forecast} from '../core/mocks/forecast';

describe('Forecast reducer', () => {

    it('should handle the initial state', () => {
        expect(handleForecastAPIActions(undefined, {})).toEqual({
                'payload': null,
                'error': null,
                'fetching': false
            }
        )
    });

    it('should handle the forecast API request action', () => {
        expect(handleForecastAPIActions([], {
            type: FORECAST_API_REQUEST,
            payload: null
        })).toEqual({
                'payload': null,
                'error': null,
                'fetching': true,
            }
        );
    });

    it('should handle the forecast API success action', () => {
        expect(handleForecastAPIActions([], {
            type: FORECAST_API_SUCCESS,
            payload: forecast
        })).toEqual({
                'payload': forecast,
                'error': null,
                'fetching': false,
            }
        );
    });

    it('should handle the forecast API failure action', () => {
        expect(handleForecastAPIActions([], {
            type: FORECAST_API_FAILURE,
            payload: 'Fetch failed'
        })).toEqual({
                'payload': null,
                'error': 'Fetch failed',
                'fetching': false,
            }
        );
    });
});