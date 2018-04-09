import React from 'react';
import {
    LOCATIONS_API_REQUEST,
    LOCATIONS_API_SUCCESS,
    LOCATIONS_API_FAILURE,
    LOCATION_SELECTED,
    locationsAPIRequest,
    locationAPIFailure,
    locationAPISuccess,
    locationSelected
} from './location.actions';
import {selectedLocation, successful, failure} from '../core/mocks/location';

describe('Location actions', () => {

    it('should have a series of define weather action types', () => {
        expect(LOCATIONS_API_REQUEST).toEqual('LOCATIONS_API_REQUEST');
        expect(LOCATIONS_API_SUCCESS).toEqual('LOCATIONS_API_SUCCESS');
        expect(LOCATIONS_API_FAILURE).toEqual('LOCATIONS_API_FAILURE');
        expect(LOCATION_SELECTED).toEqual('LOCATION_SELECTED');
    });

    it('should have a defined request action', () => {
        const mockPayload = null;
        expect(locationsAPIRequest(mockPayload)).toEqual({
            'payload': null,
            'type': LOCATIONS_API_REQUEST,
        })
    });

    it('should have a defined success action', () => {
        expect(locationAPISuccess(successful)).toEqual({
            'payload': successful,
            'type': LOCATIONS_API_SUCCESS,
        })
    });

    it('should have a defined failure action', () => {
        expect(locationAPIFailure(failure)).toEqual({
            'payload': failure,
            'type': LOCATIONS_API_FAILURE,
        })
    });

    it('should have a defined selected action', () => {
        expect(locationSelected(selectedLocation)).toEqual({
            'payload': selectedLocation,
            'type': LOCATION_SELECTED,
        })
    })
});