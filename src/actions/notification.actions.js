// @flow
export const POLL_NOTIFICATIONS_API_REQUEST = 'POLL_NOTIFICATIONS_API_REQUEST';
export const POLL_NOTIFICATIONS_API_SUCCESS = 'POLL_NOTIFICATIONS_API_SUCCESS';
export const POLL_NOTIFICATIONS_API_FAILURE = 'POLL_NOTIFICATIONS_API_FAILURE';

export function pollNotificationsAPIRequest(payload) {
    return {
        type: POLL_NOTIFICATIONS_API_REQUEST,
        payload
    }
}

export function pollNotificationsAPISuccess(payload) {
    return {
        type: POLL_NOTIFICATIONS_API_SUCCESS,
        payload
    }
}

export function pollNotificationsAPIFailure(payload) {
    return {
        type: POLL_NOTIFICATIONS_API_FAILURE,
        payload
    }
}