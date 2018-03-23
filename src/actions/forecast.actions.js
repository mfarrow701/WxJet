// @flow
export const FORECAST_API_REQUEST = 'FORECAST_API_REQUEST';
export const FORECAST_API_SUCCESS = 'FORECAST_API_SUCCESS';
export const FORECAST_API_FAILURE = 'FORECAST_API_FAILURE';

export function forecastAPIRequest(payload) {
    return {
        type: FORECAST_API_REQUEST,
        payload
    }
}

export function forecastAPISuccess(payload) {
    return {
        type: FORECAST_API_SUCCESS,
        payload
    }
}

export function forecastAPIFailure(payload) {
    return {
        type: FORECAST_API_FAILURE,
        payload
    }
}