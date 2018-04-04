// @flow
import {call, put} from 'redux-saga/effects';
import {forecastAPIFailure, forecastAPISuccess} from '../actions/forecast.actions';
import {fetchForecast} from '../services/forecast.service';

export function* forecastAPIGenerator(action) {
    try {
        const response = yield call(fetchForecast, action.payload);
        yield put(forecastAPISuccess(response));
    } catch (error) {
        yield put(forecastAPIFailure(error));
    }
}