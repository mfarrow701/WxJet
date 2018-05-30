// @flow
export const SET_CLOUD_THRESHOLD = 'SET_CLOUD_THRESHOLD';
export const SET_VISIBILITY_THRESHOLD = 'SET_VISIBILITY_THRESHOLD';
export const SET_WIND_THRESHOLD = 'SET_WIND_THRESHOLD';
export const SET_STORM_THRESHOLD = 'SET_STORM_THRESHOLD';
export const SET_THEME_STATE = 'SET_THEME_STATE';
export const SET_AIRCRAFT_TYPE = 'SET_AIRCRAFT_TYPE';

export function setCloudThreshold(payload) {
    return {
        type: SET_CLOUD_THRESHOLD,
        payload
    }
}

export function setVisibilityThreshold(payload) {
    return {
        type: SET_VISIBILITY_THRESHOLD,
        payload
    }
}

export function setWindThreshold(payload) {
    return {
        type: SET_WIND_THRESHOLD,
        payload
    }
}

export function setStormThreshold(payload) {
    return {
        type: SET_STORM_THRESHOLD,
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