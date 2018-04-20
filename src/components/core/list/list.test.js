import React from 'react';
import {shallow} from 'enzyme';
import List from './list';

describe('List component', () => {
    let component;

    const renderWrapper = () => {
        component = shallow(<List data={[]}/>);
    };

    beforeEach(() => {
        renderWrapper();
    });

    it('should render the list component after load', () => {
        expect(component).toMatchSnapshot();
    });

    it('should render a default list', () => {
        component.setProps({
            data: [
                {key: 'A', value: '123'},
                {key: 'B', value: '345'},
                {key: 'C', value: '567'},
                {key: 'D', value: '789'}
            ]
        });
        expect(component.find('.List-Content h6').first().text()).toEqual('A');
        expect(component.find('.List-Content p').first().text()).toEqual('123');
        expect(component.find('.List-Content h6').at(1).text()).toEqual('B');
        expect(component.find('.List-Content p').at(1).text()).toEqual('345');
        expect(component.find('.List-Content h6').at(2).text()).toEqual('C');
        expect(component.find('.List-Content p').at(2).text()).toEqual('567');
        expect(component.find('.List-Content h6').at(3).text()).toEqual('D');
        expect(component.find('.List-Content p').at(3).text()).toEqual('789');
    })
});
