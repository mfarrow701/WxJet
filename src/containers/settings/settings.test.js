import React from 'react';
import {shallow} from 'enzyme';
import Settings from './settings';

describe('Settings container', () => {
    let component;

    const renderWrapper = () => {
        component = shallow(<Settings/>);
    };

    beforeEach(() => {
        renderWrapper();
    });

    it('should render the settings container after load', () => {
        expect(component).toMatchSnapshot();
        expect(component.find('.Settings h1').text()).toEqual('Settings');
    });
});
