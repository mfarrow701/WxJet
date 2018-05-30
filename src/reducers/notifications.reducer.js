// @flow
import {
    NOTIFICATIONS_SUBSCRIPTION_ERROR,
    NOTIFICATIONS_SUBSCRIPTION_NEXT,
} from '../actions/notification.actions';

const initialState = {
    payload: null,
    error: null
};

export function handleNotificationActions(state = initialState, action) { // NOSONAR
    const {payload, type} = action;
    switch (type) {
        case NOTIFICATIONS_SUBSCRIPTION_NEXT:
            return {...state, payload, error: null};
        case NOTIFICATIONS_SUBSCRIPTION_ERROR:
            return {...state, payload: null, error: payload};
        default:
            return state;
    }
}