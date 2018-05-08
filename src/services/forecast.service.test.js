import React from 'react';
import fetchMock from 'fetch-mock';
import {fetchForecast} from './forecast.service';
import {forecast} from '../core/mocks/forecast';
import {selectedLocation} from '../core/mocks/location';

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
        fetchMock.get('https://cors-anywhere.herokuapp.com/https://api.datapoint.metoffice.gov.uk/points/v1/hourly-spot-forecast?longitude='+selectedLocation.longitude+'&latitude='+selectedLocation.latitude, mockResult);
        return fetchForecast([selectedLocation.longitude, selectedLocation.latitude]).then(response => {
            expect(response).toEqual(forecast);
        });
    });

    it('should throw a redirection error from the API on an unsuccessful request', () => {
        fetchMock.get('https://cors-anywhere.herokuapp.com/https://api.datapoint.metoffice.gov.uk/points/v1/hourly-spot-forecast?longitude='+selectedLocation.longitude+'&latitude='+selectedLocation.latitude, 300);
        return fetchForecast([selectedLocation.longitude, selectedLocation.latitude]).catch(error => {
            expect(error.toString()).toEqual(expect.stringContaining('Error: 300'));
        });
    });

    it('should throw an not found error from the API on an unsuccessful request', () => {
        fetchMock.get('https://cors-anywhere.herokuapp.com/https://api.datapoint.metoffice.gov.uk/points/v1/hourly-spot-forecast?longitude='+selectedLocation.longitude+'&latitude='+selectedLocation.latitude, 404);
        return fetchForecast([selectedLocation.longitude, selectedLocation.latitude]).catch(error => {
            expect(error.toString()).toEqual(expect.stringContaining('Error: 404'));
        });
    });

    it('should throw an internal server error from the API on an unsuccessful request', () => {
        fetchMock.get('https://cors-anywhere.herokuapp.com/https://api.datapoint.metoffice.gov.uk/points/v1/hourly-spot-forecast?longitude='+selectedLocation.longitude+'&latitude='+selectedLocation.latitude, 500);
        return fetchForecast([selectedLocation.longitude, selectedLocation.latitude]).catch(error => {
            expect(error.toString()).toEqual(expect.stringContaining('Error: 500'));
        });
    });
});
