// @flow
import {
    FORECAST_API_FAILURE,
    FORECAST_API_REQUEST,
    FORECAST_API_SUCCESS,
} from '../actions/forecast.actions';

const initialState = {
    fetching: false,
    payload: null,
    error: null,
    selectedLocation: null
};

export function handleForecastAPIActions(state = initialState, action) { // NOSONAR
    const {payload, type} = action;
    switch (type) {
        case FORECAST_API_REQUEST:
            return {...state, fetching: true, selectedLocation: action.payload};
        case FORECAST_API_SUCCESS:
            return {...state, fetching: false, payload, error: null};
        case FORECAST_API_FAILURE:
            return {...state, fetching: false, payload: null, error: payload};
        default:
            return state;
    }
}