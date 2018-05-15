// @flow
import {call, put} from 'redux-saga/effects';
import {forecastAPIFailure, forecastAPISuccess} from '../actions/forecast.actions';
import {fetchForecast} from '../services/forecast.service';

export function* forecastAPIGenerator(action) {
    try {
        const response = yield call(fetchForecast, action.payload);
        yield put(forecastAPISuccess(formatResponse(response)));
    } catch (error) {
        yield put(forecastAPIFailure(error));
    }
}

function formatResponse(response) {
    let forecastProperties, forecastReport;
    forecastProperties = response.features[0].properties;
    forecastReport = forecastProperties.time_series[0];
    forecastReport['altitude'] = forecastProperties.altitude;
    return forecastReport;
}