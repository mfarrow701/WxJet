import React from 'react';
import {shallow} from 'enzyme';
import Profile from './profile';

describe('Profile container', () => {
    let component;

    const renderWrapper = () => {
        component = shallow(<Profile/>);
    };

    beforeEach(() => {
        renderWrapper();
    });

    it('should render the profile container after load', () => {
        expect(component).toMatchSnapshot();
        expect(component.find('.Profile h1').text()).toEqual('Profile');
    });
});
