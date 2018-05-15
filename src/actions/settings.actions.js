// @flow
export const SET_NOTIFICATION_THRESHOLD = 'SET_NOTIFICATION_THRESHOLD';
export const SET_THEME_STATE = 'SET_THEME_STATE';
export const SET_AIRCRAFT_TYPE = 'SET_AIRCRAFT_TYPE';

export function setNotificationThreshold(payload) {
    return {
        type: SET_NOTIFICATION_THRESHOLD,
        payload
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