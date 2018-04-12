import React from 'react';
import {shallow} from 'enzyme';
import Chart from './chart';

describe('Chart container', () => {
    let component;

    const renderWrapper = () => {
        component = shallow(<Chart/>);
    };

    beforeEach(() => {
        renderWrapper();
    });

    it('should render the error container after load', () => {
        expect(component).toMatchSnapshot();
        expect(component.find('.Chart h1').text()).toEqual('No message specified');
    });
});
