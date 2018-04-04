import React from 'react';
import fetchMock from 'fetch-mock';
import {fetchForecast} from './forecast.service';
import {forecast} from '../core/mocks/forecast';
import {locationID} from '../core/mocks/location';

describe('Forecast service', () => {

    afterEach(() => {
        fetchMock.restore();
    });

    it('should fetch the forecast from the API on a successful request', () => {
        const mockResult = {
            status: 200,
            body: forecast,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetchMock.get('//datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/' + locationID + '?res=daily&key=' + process.env.REACT_APP_DATAPOINT_API_KEY, mockResult);
        return fetchForecast(locationID).then(response => {
            expect(response).toEqual(forecast);
        });
    });

    it('should throw a redirection error from the API on an unsuccessful request', () => {
        fetchMock.get('//datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/' + locationID + '?res=daily&key=' + process.env.REACT_APP_DATAPOINT_API_KEY, 300);
        return fetchForecast(locationID).catch(error => {
            expect(error.toString()).toEqual(expect.stringContaining('Error: 300'));
        });
    });

    it('should throw an not found error from the API on an unsuccessful request', () => {
        fetchMock.get('//datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/' + locationID + '?res=daily&key=' + process.env.REACT_APP_DATAPOINT_API_KEY, 404);
        return fetchForecast(locationID).catch(error => {
            expect(error.toString()).toEqual(expect.stringContaining('Error: 404'));
        });
    });

    it('should throw an internal server error from the API on an unsuccessful request', () => {
        fetchMock.get('//datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/' + locationID + '?res=daily&key=' + process.env.REACT_APP_DATAPOINT_API_KEY, 500);
        return fetchForecast(locationID).catch(error => {
            expect(error.toString()).toEqual(expect.stringContaining('Error: 500'));
        });
    });
});
