import React from 'react';
import {shallow} from 'enzyme';
import WindDirection from './wind-direction';

describe('Wind direction component', () => {
    let component;

    const renderWrapper = () => {
        component = shallow(<WindDirection/>);
    };

    beforeEach(() => {
        renderWrapper();
    });

    it('should render the wind direction component after load', () => {
        expect(component).toMatchSnapshot();
        expect(component.find('.Wind-Direction').text()).toEqual('--°');
    });

    it('should render the wind direction component with a custom value', () => {
        component.setProps({value: '107'});
        expect(component.find('.Wind-Direction').text()).toEqual('107°');
    });
});
