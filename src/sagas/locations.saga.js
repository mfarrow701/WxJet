// @flow
import {call, put} from 'redux-saga/effects';
import {locationAPIFailure, locationAPISuccess} from '../actions/location.actions';
import {fetchLocations} from '../services/locations.service';

export function* locationsAPIGenerator() {
    try {
        const response = yield call(fetchLocations);
        yield put(locationAPISuccess(response));
    } catch (error) {
        yield put(locationAPIFailure(error));
    }
}