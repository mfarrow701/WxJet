import React from 'react';
import {shallow} from 'enzyme';
import Country from './country';

describe('Country component', () => {
    let component;

    const renderWrapper = () => {
        component = shallow(<Country/>);
    };

    beforeEach(() => {
        renderWrapper();
    });

    it('should render the country component after load', () => {
        expect(component).toMatchSnapshot();
        expect(component.find('.Country').text()).toEqual('No country specified');
    });

    it('should render the country component with a custom message', () => {
        component.setProps({value: 'United Kingdom'});
        expect(component.find('.Country').text()).toEqual('United Kingdom');
    });
});
