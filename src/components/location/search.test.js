import React from 'react';
import {shallow} from 'enzyme';
import Search from './search';

describe('Search component', () => {
    let component;

    const renderWrapper = () => {
        component = shallow(<Search/>);
    };

    beforeEach(() => {
        renderWrapper();
    });

    it('should render the search component after load', () => {
        expect(component).toMatchSnapshot();
    });
});
