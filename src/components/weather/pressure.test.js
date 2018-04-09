import React from 'react';
import {shallow} from 'enzyme';
import Pressure from './pressure';

describe('Pressure component', () => {
    let component;

    const renderWrapper = () => {
        component = shallow(<Pressure/>);
    };

    beforeEach(() => {
        renderWrapper();
    });

    it('should render the pressure component after load', () => {
        expect(component).toMatchSnapshot();
        expect(component.find('.Pressure-Type').text()).toEqual('QNH');
        expect(component.find('.Pressure-Value').text()).toEqual('1024');
    });
});
