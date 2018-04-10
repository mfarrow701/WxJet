import React from 'react';
import {shallow} from 'enzyme';
import configureStore from 'redux-mock-store';
import {selectedLocation} from '../../core/mocks/location';
import Profile from './profile';

describe('Profile container', () => {
    const initialState = {
            locationsReducer: {selectedLocation: selectedLocation},
        },
        mockStore = configureStore([]);
    let component, store;

    const renderWrapper = state => {
        store = mockStore(state);
        component = shallow(<Profile store={store}/>).dive();
    };

    beforeEach(() => {
        renderWrapper(initialState);
    });

    it('should render the profile container after load', () => {
        expect(component.find('.Profile .Avatar h3').text()).toEqual('Matthew Farrow');
        expect(component.find('.Profile .Avatar p').text()).toEqual('Web Application Developer');
        expect(component.find('.Profile .Details .Email').text()).toEqual('Email: N/A');
        expect(component.find('.Profile .Details .Favourite-Location').text()).toEqual('Home location: ' + selectedLocation.name);
    });
});
