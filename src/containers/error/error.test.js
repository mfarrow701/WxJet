import React from 'react';
import {shallow} from 'enzyme';
import Error from './error';

describe('Error container', () => {
    let component;

    const renderWrapper = () => {
        component = shallow(<Error/>);
    };

    beforeEach(() => {
        renderWrapper();
    });

    it('should render the error container after load', () => {
        expect(component).toMatchSnapshot();
        expect(component.find('.Error h1').text()).toEqual('No message specified');
    });

    it('should render the error container with a custom message', () => {
        component.setProps({message: 'Page not found'});
        expect(component.find('.Error h1').text()).toEqual('Page not found');
    });
});
