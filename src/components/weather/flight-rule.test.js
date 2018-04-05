import React from 'react';
import {shallow} from 'enzyme';
import FlightRule from './flight-rule';

describe('Flight rule component', () => {
    let component;

    const renderWrapper = () => {
        component = shallow(<FlightRule/>);
    };

    beforeEach(() => {
        renderWrapper();
    });

    it('should render the flight rule component after load', () => {
        expect(component.find('.Flight-Rule').text()).toEqual('VFR')
    });

    it('should calculate the correct flight rule for a given ceiling height and visibility', () => {
        expect(component.instance().calculateFlightRule(0, 0)).toEqual({
            'colour': '#6b49c8',
            'state': 'LIFR'
        });
        expect(component.instance().calculateFlightRule(300, 700)).toEqual({
            'colour': '#6b49c8',
            'state': 'LIFR'
        });
        expect(component.instance().calculateFlightRule(400, 1000)).toEqual({
            'colour': '#6b49c8',
            'state': 'LIFR'
        });
        expect(component.instance().calculateFlightRule(500, 900)).toEqual({
            'colour': '#6b49c8',
            'state': 'LIFR'
        });
        expect(component.instance().calculateFlightRule(500, 1000)).toEqual({
            state: 'IFR',
            colour: '#d81700'
        });
        expect(component.instance().calculateFlightRule(700, 2000)).toEqual({
            state: 'IFR',
            colour: '#d81700'
        });
        expect(component.instance().calculateFlightRule(700, 3000)).toEqual({
            state: 'IFR',
            colour: '#d81700'
        });
        expect(component.instance().calculateFlightRule(1000, 2000)).toEqual({
            state: 'IFR',
            colour: '#d81700'
        });
        expect(component.instance().calculateFlightRule(1000, 3000)).toEqual({
            state: 'MVFR',
            colour: '#f7e401'
        });

        expect(component.instance().calculateFlightRule(2500, 4000)).toEqual({
            state: 'MVFR',
            colour: '#f7e401'
        });
        expect(component.instance().calculateFlightRule(2500, 5000)).toEqual({
            state: 'MVFR',
            colour: '#f7e401'
        });
        expect(component.instance().calculateFlightRule(3000, 4000)).toEqual({
            state: 'MVFR',
            colour: '#f7e401'
        });
        expect(component.instance().calculateFlightRule(3000, 5000)).toEqual({
            state: 'VFR',
            colour: '#289500'
        });

        expect(component.instance().calculateFlightRule(7000, 10000)).toEqual({
            state: 'VFR',
            colour: '#289500'
        });
    })
});
