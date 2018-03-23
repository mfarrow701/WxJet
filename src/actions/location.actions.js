// @flow
export const LOCATIONS_API_REQUEST = 'LOCATIONS_API_REQUEST';
export const LOCATIONS_API_SUCCESS = 'LOCATIONS_API_SUCCESS';
export const LOCATIONS_API_FAILURE = 'LOCATIONS_API_FAILURE';
export const LOCATION_SELECTED = 'LOCATION_SELECTED';

export function locationsAPIRequest(payload) {
    return {
        type: LOCATIONS_API_REQUEST,
        payload
    }
}

export function locationAPISuccess(payload) {
    return {
        type: LOCATIONS_API_SUCCESS,
        payload
    }
}

export function locationAPIFailure(payload) {
    return {
        type: LOCATIONS_API_FAILURE,
        payload
    }
}

export function locationSelected(payload) {
    return {
        type: LOCATION_SELECTED,
        payload
    }
}