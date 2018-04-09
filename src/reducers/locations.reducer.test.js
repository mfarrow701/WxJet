import React from 'react';
import {handleLocationsAPIActions} from './locations.reducer';
import {
    LOCATIONS_API_FAILURE,
    LOCATIONS_API_SUCCESS,
    LOCATIONS_API_REQUEST,
    LOCATION_SELECTED
} from '../actions/location.actions';
import {selectedLocation, locations} from '../core/mocks/location';

describe('Locations reducer', () => {

    it('should handle the initial state', () => {
        expect(handleLocationsAPIActions(undefined, {})).toEqual({
                'payload': null,
                'error': null,
                'fetching': false,
                'selectedLocation': null
            }
        )
    });

    it('should handle the locations API request action', () => {
        expect(handleLocationsAPIActions([], {
            type: LOCATIONS_API_REQUEST,
            payload: null
        })).toEqual({
                'payload': null,
                'error': null,
                'fetching': true,
            }
        );
    });

    it('should handle the locations API success action', () => {
        expect(handleLocationsAPIActions([], {
            type: LOCATIONS_API_SUCCESS,
            payload: locations
        })).toEqual({
                'payload': locations,
                'error': null,
                'fetching': false,
            }
        );
    });

    it('should handle the locations API failure action', () => {
        expect(handleLocationsAPIActions([], {
            type: LOCATIONS_API_FAILURE,
            payload: 'Fetch failed'
        })).toEqual({
                'payload': null,
                'error': 'Fetch failed',
                'fetching': false,
            }
        );
    });

    it('should handle the locations selected action', () => {
        expect(handleLocationsAPIActions([], {
            type: LOCATION_SELECTED,
            payload: selectedLocation
        })).toEqual({
                'selectedLocation': selectedLocation
            }
        );
    });
});