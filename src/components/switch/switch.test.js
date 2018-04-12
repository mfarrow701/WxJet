import React from 'react';
import {shallow} from 'enzyme';
import Switch from './switch';

describe('Search component', () => {
    let component;

    const renderWrapper = () => {
        component = shallow(<Switch />);
    };

    beforeEach(() => {
        renderWrapper();
    });

    it('should render the search component after load', () => {
        expect(component).toMatchSnapshot();
    });
});
