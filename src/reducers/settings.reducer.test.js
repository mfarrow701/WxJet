import React from 'react';
import {handleSettingsActions} from './settings.reducer';
import {setNotificationState, setThemeState} from '../actions/settings.actions';

describe('Settings reducer', () => {

    it('should handle the initial state', () => {
        expect(handleSettingsActions(undefined, {})).toEqual({
                'notificationsEnabled': false,
                'themeIsDark': true
            }
        )
    });

    it('should handle the set notification state action', () => {
        expect(handleSettingsActions({}, setNotificationState())).toEqual({
            'notificationsEnabled': true
        });
        expect(handleSettingsActions({
            'notificationsEnabled': true
        }, setNotificationState())).toEqual({
            'notificationsEnabled': false
        });
    });

    it('should handle the set notification state action', () => {
        expect(handleSettingsActions({}, setThemeState())).toEqual({
            'themeIsDark': true
        });
        expect(handleSettingsActions({
            'themeIsDark': true
        }, setThemeState())).toEqual({
            'themeIsDark': false
        });
    });
});