import {call, put} from 'redux-saga/effects';
import {pollNotificationsAPISuccess, pollNotificationsAPIFailure} from '../actions/notification.actions';
import {fetchPollNotifications} from '../services/notifications.service';

export function* pollNotificationsAPIGenerator(action) {
    try {
        const response = yield call(fetchPollNotifications);
        yield put(pollNotificationsAPISuccess(response));
    } catch (error) {
        yield put(pollNotificationsAPIFailure(error));
    }
}