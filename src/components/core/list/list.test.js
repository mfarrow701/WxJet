import React from 'react';
import {shallow} from 'enzyme';
import List from './list';

describe('List component', () => {
    let component;

    const renderWrapper = () => {
        component = shallow(<List />);
    };

    beforeEach(() => {
        renderWrapper();
    });

    it('should render the list component after load', () => {
        expect(component).toMatchSnapshot();
    });
});
