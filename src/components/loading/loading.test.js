import React from 'react';
import {shallow} from 'enzyme';
import Loading from './loading';

describe('Loading component', () => {
    let component;

    const renderWrapper = () => {
        component = shallow(<Loading/>);
    };

    beforeEach(() => {
        renderWrapper();
    });

    it('should render the loading component after load', () => {
        expect(component).toMatchSnapshot();
    });
});
