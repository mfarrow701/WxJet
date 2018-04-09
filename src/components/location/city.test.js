import React from 'react';
import {shallow} from 'enzyme';
import City from './city';
import {selectedLocation} from '../../core/mocks/location';

describe('City component', () => {
    let component;

    const renderWrapper = () => {
        component = shallow(<City/>);
    };

    beforeEach(() => {
        renderWrapper();
    });

    it('should render the city component after load', () => {
        expect(component).toMatchSnapshot();
        expect(component.find('.City').text()).toEqual('No city specified');
    });

    it('should render the city component with a custom message', () => {
        component.setProps({value: selectedLocation.name});
        expect(component.find('.City').text()).toEqual('Newquay Cornwall Airport');
    });
});
