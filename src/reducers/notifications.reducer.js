// @flow
import {
    POLL_NOTIFICATIONS_API_REQUEST,
    POLL_NOTIFICATIONS_API_FAILURE,
    POLL_NOTIFICATIONS_API_SUCCESS,
} from '../actions/notification.actions';

const initialState = {
    fetching: false,
    payload: null,
    error: null
};

export function handleNotificationActions(state = initialState, action) { // NOSONAR
    const {payload, type} = action;
    switch (type) {
        case POLL_NOTIFICATIONS_API_REQUEST:
            return {...state, fetching: true, payload: null, error: null};
        case POLL_NOTIFICATIONS_API_SUCCESS:
            return {...state, fetching: false, payload, error: null};
        case POLL_NOTIFICATIONS_API_FAILURE:
            return {...state, fetching: false, payload: null, error: payload};
        default:
            return state;
    }
}