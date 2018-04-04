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
        expect(component.contains(<h1>No message specified</h1>)).toEqual(true);
    });

    it('should render the error container with a custom message', () => {
        component.setProps({message: 'Page not found'});
        expect(component.contains(<h1>Page not found</h1>)).toEqual(true);
    });
});
