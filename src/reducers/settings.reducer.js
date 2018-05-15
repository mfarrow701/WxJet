// @flow
import {SET_NOTIFICATION_THRESHOLD, SET_THEME_STATE, SET_AIRCRAFT_TYPE} from '../actions/settings.actions';

const initialState = {
    notificationsThreshold: 2000,
    themeIsDark: false,
    typeIsFixedWing: true
};

export function handleSettingsActions(state = initialState, action) { // NOSONAR
    const {type} = action;
    switch (type) {
        case SET_NOTIFICATION_THRESHOLD:
            return {...state, notificationsThreshold: parseInt(action.payload, 10)};
        case SET_THEME_STATE:
            return {...state, themeIsDark: !state.themeIsDark};
        case SET_AIRCRAFT_TYPE:
            return {...state, typeIsFixedWing: !state.typeIsFixedWing};
        default:
            return state;
    }
}