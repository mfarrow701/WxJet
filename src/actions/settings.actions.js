// @flow
export const SET_NOTIFICATION_STATE = 'SET_NOTIFICATION_STATE';
export const SET_THEME_STATE = 'SET_THEME_STATE';

export function setNotificationState() {
    return {
        type: SET_NOTIFICATION_STATE
    }
}

export function setThemeState() {
    return {
        type: SET_THEME_STATE
    }
}