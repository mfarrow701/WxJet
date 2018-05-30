// @flow
import {all, takeLatest} from 'redux-saga/effects';
import {LOCATIONS_API_REQUEST} from '../actions/location.actions';
import {locationsAPIGenerator} from './locations.saga';
import {FORECAST_API_REQUEST} from '../actions/forecast.actions'
import {forecastAPIGenerator} from './forecast.saga';

export default function* rootSaga() {
    yield all([
        takeLatest(LOCATIONS_API_REQUEST, locationsAPIGenerator),
        takeLatest(FORECAST_API_REQUEST, forecastAPIGenerator)
    ])
}
