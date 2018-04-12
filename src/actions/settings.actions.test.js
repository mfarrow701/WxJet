import React from 'react';
import {
    SET_NOTIFICATION_STATE,
    SET_THEME_STATE,
    setNotificationState,
    setThemeState
} from './settings.actions';

describe('Location actions', () => {

    it('should have a series of defined settings action types', () => {
        expect(SET_NOTIFICATION_STATE).toEqual('SET_NOTIFICATION_STATE');
        expect(SET_THEME_STATE).toEqual('SET_THEME_STATE');
    });

    it('should have a defined set notification state action', () => {
        expect(setNotificationState()).toEqual({
            'type': SET_NOTIFICATION_STATE,
        });
    });

    it('should have a defined set theme state action', () => {
        expect(setThemeState()).toEqual({
            'type': SET_THEME_STATE,
        });
    });
});