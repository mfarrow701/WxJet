import React from 'react';
import {shallow} from 'enzyme';
import configureStore from 'redux-mock-store';
import {DateTime} from 'luxon';
import {selectedLocation} from '../../core/mocks/location';
import Dashboard from './dashboard';

describe('Dashboard container', () => {
    const initialState = {
            flightReducer: {fetching: false, payload: null, error: null},
            locationsReducer: {selectedLocation: selectedLocation},
        },
        mockStore = configureStore([]);
    let component, store;

    const renderWrapper = state => {
        store = mockStore(state);
        component = shallow(<Dashboard store={store}/>).dive();
    };

    beforeEach(() => {
        renderWrapper(initialState);
    });

    it('should render the loading screen before receiving data', () => {

    });

    it('should render the dashboard container after load', () => {
        expect(component.find('.Dashboard .Location-Card City').props().value).toEqual('Newquay Cornwall Airport');
        expect(component.find('.Dashboard .Location-Card Country').props().value).toEqual('United Kingdom, updated 7 min ago');
        expect(component.find('.Dashboard .Flight-Card .Content h5').text()).toMatch(/Flight information/);
        expect(component.find('.Dashboard .Flight-Card Time').props().format).toEqual(DateTime.TIME_24_WITH_SECONDS);
        expect(component.find('.Dashboard .Wind-Card .Content h5').text()).toMatch(/Wind & pressure/);
        expect(component.find('.Dashboard .Details-Card .Content h5').text()).toMatch(/Details/);
    });
});
