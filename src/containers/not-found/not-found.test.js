import React from 'react';
import {shallow} from 'enzyme';
import NotFound from './not-found';

describe('Not found container', () => {
    let component;

    const renderWrapper = () => {
        component = shallow(<NotFound/>);
    };

    beforeEach(() => {
        renderWrapper();
    });

    it('should render the not-found container after load', () => {
        expect(component).toMatchSnapshot();
        expect(component.find('.Not-Found h1').text()).toEqual('Not Found!');
    });
});
