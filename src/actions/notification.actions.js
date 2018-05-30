// @flow
export const NOTIFICATIONS_SUBSCRIPTION_NEXT = 'NOTIFICATIONS_SUBSCRIPTION_NEXT';
export const NOTIFICATIONS_SUBSCRIPTION_ERROR = 'NOTIFICATIONS_SUBSCRIPTION_ERROR';

export function notificationsSubscriptionNext(payload) {
    return {
        type: NOTIFICATIONS_SUBSCRIPTION_NEXT,
        payload
    }
}

export function notificationsSubscriptionError(payload) {
    return {
        type: NOTIFICATIONS_SUBSCRIPTION_ERROR,
        payload
    }
}