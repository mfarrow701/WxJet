import React from 'react';
import {shallow} from 'enzyme';
import configureStore from 'redux-mock-store';
import Search from './search';

describe('Search component', () => {
    const initialState = {
            locationsReducer: {fetching: null, payload: null, error: null},
        },
        mockStore = configureStore([]);
    let component, store;

    const renderWrapper = state => {
        store = mockStore(state);
        component = shallow(<Search store={store}/>).dive();
    };

    beforeEach(() => {
        renderWrapper(initialState);
    });

    it('should render the search component after load', () => {
        expect(component).toMatchSnapshot();
    });
});
