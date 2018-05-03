// @flow
export const SET_NOTIFICATION_STATE = 'SET_NOTIFICATION_STATE';
export const SET_THEME_STATE = 'SET_THEME_STATE';
export const SET_AIRCRAFT_TYPE = 'SET_AIRCRAFT_TYPE';

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

export function setAircraftType() {
    return {
        type: SET_AIRCRAFT_TYPE
    }
}