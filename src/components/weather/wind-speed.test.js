import React from 'react';
import {shallow} from 'enzyme';
import WindSpeed from './wind-speed';

describe('Wind speed component', () => {
    let component;

    const renderWrapper = () => {
        component = shallow(<WindSpeed/>);
    };

    beforeEach(() => {
        renderWrapper();
    });

    it('should render the wind speed component after load', () => {
        expect(component).toMatchSnapshot();
        expect(component.find('.Wind-Speed').text()).toEqual('--kts');
    });

    it('should render the wind speed component with a custom value', () => {
        component.setProps({value: 7});
        expect(component.find('.Wind-Speed').text()).toEqual('7m/s');
    });

    it('should toggle between knots and metres per second on click', () => {
        component.setProps({value: 7});
        component.find('.Wind-Speed').simulate('click');
        expect(component.find('.Wind-Speed').text()).toEqual('14kts');
        component.find('.Wind-Speed').simulate('click');
        expect(component.find('.Wind-Speed').text()).toEqual('7m/s');
    });
});
