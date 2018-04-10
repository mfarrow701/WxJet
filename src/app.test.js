import React from 'react';
import {shallow} from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import configureStore from 'redux-mock-store';
import {selectedLocation} from './core/mocks/location';
import App from './app';
import Search from './components/location/search';

describe('App component', () => {
    const mockStore = configureStore([]),
        history = createMemoryHistory('/');
    let component, store,
        initialState = {
            flightReducer: {fetching: false, payload: null, error: null},
            locationsReducer: {selectedLocation: null},
            routerReducer: {location: {pathname: '/'}}
        };

    const renderWrapper = (state) => {
        store = mockStore(state);
        component = shallow(<App history={history} store={store}/>).dive();
    };

    it('should render a pre-boot message during load', () => {
        renderWrapper(initialState);
        component.setState({appLoaded: false});
        expect(component.contains(<h1>Loading</h1>)).toEqual(true);
    });

    it('should no longer render a pre-boot message after load', () => {
        renderWrapper(initialState);
        expect(component.contains(<h1>Loading</h1>)).toEqual(false);
    });

    it('should render the default locations search if there is no selected location', () => {
        renderWrapper(initialState);
        expect(component.find(Search).length).toEqual(1);
    });

    it('should render the default container if there is a selected location', () => {
        initialState = {
            flightReducer: {fetching: false, payload: null, error: null},
            locationsReducer: {selectedLocation: selectedLocation},
            routerReducer: {location: {pathname: '/'}}
        };
        renderWrapper(initialState);
        expect(component.find(Search).length).toEqual(0);
    });

    it.skip('should dispatch the location selected action if there is a stored location present', () => {
        global.localStorage.getItem.mockReturnValue(JSON.stringify(selectedLocation));
        component.simulate('selectLocation', selectedLocation);
        console.log(store.getActions());
        // expect(dispatchMock.mock.calls.length).toEqual(2);
    });

    it.skip('should not dispatch the location selected action if there is no stored location present', () => {
    });

    it('should set the default view path to home', () => {
        renderWrapper(initialState);
        expect(component.props().history.location.pathname).toEqual('/');
    });

    it('should navigate to the home container on click', () => {
        renderWrapper(initialState);
        component.find('.Footer .Item').at(0).simulate('click');
        expect(component.props().history.location.pathname).toEqual('/');
    });

    it('should navigate to the profile container on click', () => {
        renderWrapper(initialState);
        component.find('.Footer .Item').at(1).simulate('click');
        expect(component.props().history.location.pathname).toEqual('/profile');
    });

    it('should navigate to the charts container on click', () => {
        renderWrapper(initialState);
        component.find('.Footer .Item').at(2).simulate('click');
        expect(component.props().history.location.pathname).toEqual('/charts');
    });

    it('should navigate to the settings container on click', () => {
        renderWrapper(initialState);
        component.find('.Footer .Item').at(3).simulate('click');
        expect(component.props().history.location.pathname).toEqual('/settings');
    });
});
