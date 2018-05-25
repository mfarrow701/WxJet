// @flow
import {all, takeLatest} from 'redux-saga/effects';
import {LOCATIONS_API_REQUEST} from '../actions/location.actions';
import {locationsAPIGenerator} from './locations.saga';
import {FORECAST_API_REQUEST} from '../actions/forecast.actions'
import {forecastAPIGenerator} from './forecast.saga';
import {POLL_NOTIFICATIONS_API_REQUEST} from '../actions/notification.actions'
import {pollNotificationsAPIGenerator} from './notifications.saga';

export default function* rootSaga() {
    yield all([
        takeLatest(LOCATIONS_API_REQUEST, locationsAPIGenerator),
        takeLatest(FORECAST_API_REQUEST, forecastAPIGenerator),
        takeLatest(POLL_NOTIFICATIONS_API_REQUEST, pollNotificationsAPIGenerator)
    ])
}
