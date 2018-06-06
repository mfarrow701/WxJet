// @flow
import {all, takeLatest} from 'redux-saga/effects';
import {LOCATIONS_API_REQUEST} from '../actions/location.actions';
import {locationsAPIGenerator} from './locations.saga';
import {FORECAST_API_REQUEST} from '../actions/forecast.actions'
import {forecastAPIGenerator} from './forecast.saga';
import {SIGN_IN_REQUEST, SIGN_OUT_REQUEST} from '../actions/authentication.actions';
import {signInGenerator, signOutGenerator} from './authentication.saga';

export default function* rootSaga() {
    yield all([
        takeLatest(LOCATIONS_API_REQUEST, locationsAPIGenerator),
        takeLatest(FORECAST_API_REQUEST, forecastAPIGenerator),
        takeLatest(SIGN_IN_REQUEST, signInGenerator),
        takeLatest(SIGN_OUT_REQUEST, signOutGenerator)
    ])
}
