import React from 'react';
import {shallow} from 'enzyme';
import Temperature from './temperature';

describe('Temperature component', () => {
    let component;

    const renderWrapper = () => {
        component = shallow(<Temperature/>);
    };

    beforeEach(() => {
        renderWrapper();
    });

    it('should render the temperature component after load', () => {
        expect(component).toMatchSnapshot();
        expect(component.find('.Temperature').text()).toEqual('--°C');
    });

    it('should render the temperature component with a custom value', () => {
        component.setProps({value: 7});
        expect(component.find('.Temperature').text()).toEqual('7°C');
    });

    it('should toggle between celsius and fahrenheit on click', () => {
        component.setProps({value: 7});
        component.find('.Temperature').simulate('click');
        expect(component.find('.Temperature').text()).toEqual('44.6°F');
        component.find('.Temperature').simulate('click');
        expect(component.find('.Temperature').text()).toEqual('7°C');
    });
});
