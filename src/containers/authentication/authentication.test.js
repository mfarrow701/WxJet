import React from 'react';
import {shallow} from 'enzyme';
import Authentication from './authentication';

describe('Authentication container', () => {
    let component;

    const renderWrapper = () => {
        component = shallow(<Authentication/>);
    };

    beforeEach(() => {
        renderWrapper();
    });

    it('should render the authentication container after load', () => {
        expect(component).toMatchSnapshot();
        expect(component.find('.Authentication h1').text()).toEqual('Not Found!');
    });
});
