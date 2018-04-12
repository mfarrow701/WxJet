// @flow
import {SET_NOTIFICATION_STATE, SET_THEME_STATE} from '../actions/settings.actions';

const initialState = {
    notificationsEnabled: false,
    themeIsDark: true
};

export function handleSettingsActions(state = initialState, action) { // NOSONAR
    const {type} = action;

    switch (type) {
        case SET_NOTIFICATION_STATE:
            return {...state, notificationsEnabled: !state.notificationsEnabled};
        case SET_THEME_STATE:
            return {...state, themeIsDark: !state.themeIsDark};
        default:
            return state;
    }
}