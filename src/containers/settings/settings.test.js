import React from 'react';
import {shallow} from 'enzyme';
import configureStore from 'redux-mock-store';
import Settings from './settings';

describe('Settings container', () => {
    const initialState = {
            settings: {notificationsEnabled: false},
        },
        mockStore = configureStore([]);
    let component, store;

    const renderWrapper = state => {
        store = mockStore(state);
        component = shallow(<Settings store={store}/>).dive();
    };

    beforeEach(() => {
        renderWrapper(initialState);
    });

    it('should render the settings container after load', () => {
        expect(component.find('.Settings h1').text()).toEqual('Settings');
    });
});
