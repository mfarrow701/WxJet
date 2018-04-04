import React from 'react';
import {createStore} from 'redux';
import {LOCATION_CHANGE} from 'react-router-redux';
import rootReducer from './root.reducer';
import {
    FORECAST_API_SUCCESS,
} from '../actions/forecast.actions';
import {
    LOCATIONS_API_SUCCESS,
} from '../actions/location.actions';
import {forecast} from '../core/mocks/forecast';
import {locations} from '../core/mocks/location';

describe('Root reducer', () => {
    let store;

    beforeEach(() => {
        store = createStore(rootReducer);
    });

    it('should initialize the store using the root reducer', () => {
        expect(store.getState().forecastReducer).toEqual({
            'payload': null,
            'error': null,
            'fetching': false,
        });
        expect(store.getState().locationsReducer).toEqual({
            'payload': null,
            'error': null,
            'fetching': false,
            'selectedLocation': null
        });
        expect(store.getState().routerReducer).toEqual({
            location: null
        });
    });

    it('should update the store with a router action', () => {
        const mockAction = {
            type: LOCATION_CHANGE,
            payload: '/mock-view'
        };
        store.dispatch(mockAction);
        expect(store.getState().routerReducer).toEqual({
            location: '/mock-view'
        });
    });

    it('should update the store with a forecast action', () => {
        const mockAction = {
            type: FORECAST_API_SUCCESS,
            payload: forecast
        };
        store.dispatch(mockAction);
        expect(store.getState().forecastReducer).toEqual({
            'payload': forecast,
            'error': null,
            'fetching': false,
        });
    });

    it('should update the store with a location action', () => {
        const mockAction = {
            type: LOCATIONS_API_SUCCESS,
            payload: locations
        };
        store.dispatch(mockAction);
        expect(store.getState().locationsReducer).toEqual({
            'payload': locations,
            'error': null,
            'fetching': false,
            'selectedLocation': null
        });
    });
});