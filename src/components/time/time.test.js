import React from 'react';
import {shallow} from 'enzyme';
import {DateTime} from 'luxon';
import Time from './time';

describe('Time component', () => {
    let component, dateTimeSpy, dateTimeMock;

    const renderWrapper = () => {
        component = shallow(<Time />);
    };

    beforeEach(() => {
        jest.useFakeTimers();
        dateTimeMock = DateTime.local(2018, 4, 7, 7, 30);
        dateTimeSpy = jest.spyOn(DateTime, 'local').mockImplementation(() => dateTimeMock);
        renderWrapper();
    });

    afterEach(() => {
        dateTimeSpy.mockClear();
    });

    it('should render the time component after load', () => {
        expect(component).toMatchSnapshot();
        expect(component.find('.Time').text()).toEqual('07:30');
    });

    it('should handle the lifecycle events', () => {
        const willUnmountSpy = jest.fn();
        component.instance().componentWillUnmount = willUnmountSpy;
        expect(willUnmountSpy.mock.calls.length).toEqual(0);
        component.unmount();
        expect(willUnmountSpy.mock.calls.length).toEqual(1);
        willUnmountSpy.mockClear();
    });

    it('should render the error container with a custom format', () => {
        component.setProps({format: DateTime.DATE_FULL});
        expect(component.find('.Time').text()).toEqual('April 7, 2018');
        component.setProps({format: DateTime.DATETIME_HUGE_WITH_SECONDS});
        expect(component.find('.Time').text()).toEqual('Saturday, April 7, 2018, 7:30:00 AM British Summer Time');
    });

    it.skip('should initialise and handle the time interval on mount', () => {
        const setStateSpy = jest.spyOn(DateTime, 'local');
        expect(setStateSpy).toHaveBeenCalledTimes(1);
        jest.runTimersToTime(1000);
        expect(setStateSpy).toHaveBeenCalledTimes(2);
        jest.runTimersToTime(7000);
        expect(setStateSpy).toHaveBeenCalledTimes(9);
        setStateSpy.mockClear();
    });
});
