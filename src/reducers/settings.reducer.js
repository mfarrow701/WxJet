// @flow
import {
    SET_CLOUD_THRESHOLD,
    SET_VISIBILITY_THRESHOLD,
    SET_WIND_THRESHOLD,
    SET_STORM_THRESHOLD,
    SET_THEME_STATE,
    SET_AIRCRAFT_TYPE
} from '../actions/settings.actions';

const initialState = {
    cloudThreshold: 2000,
    visibilityThreshold: 1000,
    windThreshold: 25,
    stormThreshold: 50,
    themeIsDark: false,
    typeIsFixedWing: true
};

export function handleSettingsActions(state = initialState, action) { // NOSONAR
    const {type} = action;
    switch (type) {
        case SET_CLOUD_THRESHOLD:
            return {...state, cloudThreshold: parseInt(action.payload, 10)};
        case SET_VISIBILITY_THRESHOLD:
            return {...state, visibilityThreshold: parseInt(action.payload, 10)};
        case SET_WIND_THRESHOLD:
            return {...state, windThreshold: parseInt(action.payload, 10)};
        case SET_STORM_THRESHOLD:
            return {...state, stormThreshold: parseInt(action.payload, 10)};
        case SET_THEME_STATE:
            return {...state, themeIsDark: !state.themeIsDark};
        case SET_AIRCRAFT_TYPE:
            return {...state, typeIsFixedWing: !state.typeIsFixedWing};
        default:
            return state;
    }
}