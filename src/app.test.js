import React from 'react';
import {mount, shallow} from 'enzyme';
import {Provider} from 'react-redux';
import createMemoryHistory from 'history/createMemoryHistory';
import configureStore from 'redux-mock-store';
import App from './app';

describe('App component', () => {
    const initialState = {
            flightReducer: {fetching: false, payload: null, error: null},
            routerReducer: {location: {pathname: '/'}}
        },
        mockStore = configureStore([]),
        history = createMemoryHistory('/');
    let component, store;

    const renderWrapper = (state) => {
        store = mockStore(state);
        component = mount(<Provider store={store}><App/></Provider>);
    };

    beforeEach(() => {
        renderWrapper(initialState);
    });

    it('should render the app after load', () => {
        component.setState({appLoaded: true});
        expect(component.contains(<h1>Loading</h1>)).toEqual(false);
    });

    it('should render the pre-boot during load', () => {
        component.setState({appLoaded: false});
        expect(component.contains(<h1>Loading</h1>)).toEqual(true);
    });

    it('should have a default view path set', () => {
        expect(component.props().history.location.pathname).toEqual('/')
    })
});
