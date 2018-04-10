// @flow
import {
    LOCATIONS_API_FAILURE,
    LOCATIONS_API_SUCCESS,
    LOCATIONS_API_REQUEST,
    LOCATION_SELECTED
} from '../actions/location.actions';

const initialState = {
    fetching: false,
    payload: null,
    error: null,
    selectedLocation: null
};

export function handleLocationsAPIActions(state = initialState, action) { // NOSONAR
    const {payload, type} = action;

    switch (type) {
        case LOCATIONS_API_REQUEST:
            return {...state, fetching: true, payload: null, error: null};
        case LOCATIONS_API_SUCCESS:
            return {...state, fetching: false, payload, error: null};
        case LOCATIONS_API_FAILURE:
            return {...state, fetching: false, payload: null, error: payload};
        case LOCATION_SELECTED:
            return {...state, selectedLocation: payload};
        default:
            return state;
    }
}