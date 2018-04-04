import React from 'react';
import fetchMock from 'fetch-mock';
import {fetchLocations, filterLocations} from './locations.service';
import {locations} from '../core/mocks/location';

describe('Locations service', () => {

    afterEach(() => {
        fetchMock.restore();
    });

    it('should fetch the locations from the API on a successful request', () => {
        const mockResult = {
            status: 200,
            body: locations,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetchMock.get('//datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/sitelist?key=' + process.env.REACT_APP_DATAPOINT_API_KEY, mockResult);
        return fetchLocations().then(response => {
            expect(response).toEqual(locations);
        });
    });

    it('should throw a redirection error from the API on an unsuccessful request', () => {
        fetchMock.get('//datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/sitelist?key=' + process.env.REACT_APP_DATAPOINT_API_KEY, 300);
        return fetchLocations().catch(error => {
            expect(error.toString()).toEqual(expect.stringContaining('Error: 300'));
        });
    });

    it('should throw an not found error from the API on an unsuccessful request', () => {
        fetchMock.get('//datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/sitelist?key=' + process.env.REACT_APP_DATAPOINT_API_KEY, 404);
        return fetchLocations().catch(error => {
            expect(error.toString()).toEqual(expect.stringContaining('Error: 404'));
        });
    });

    it('should throw an internal server error from the API on an unsuccessful request', () => {
        fetchMock.get('//datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/sitelist?key=' + process.env.REACT_APP_DATAPOINT_API_KEY, 500);
        return fetchLocations().catch(error => {
            expect(error.toString()).toEqual(expect.stringContaining('Error: 500'));
        });
    });

    it('should filter the locations on a search query', () => {
        const array = locations.Locations.Location;
        expect(filterLocations(array, 'Airport', 10)).toEqual([{
            'elevation': '50.0',
            'id': '14',
            'latitude': '54.9375',
            'longitude': '-2.8092',
            'name': 'Carlisle Airport',
            'region': 'nw',
            'unitaryAuthArea': 'Cumbria'
        }, {
            'elevation': '22.0',
            'id': '26',
            'latitude': '53.3336',
            'longitude': '-2.85',
            'name': 'Liverpool John Lennon Airport',
            'region': 'nw',
            'unitaryAuthArea': 'Merseyside'
        }]);
        expect(filterLocations(array, 'Carlisle', 10)).toEqual([{
            'elevation': '50.0',
            'id': '14',
            'latitude': '54.9375',
            'longitude': '-2.8092',
            'name': 'Carlisle Airport',
            'region': 'nw',
            'unitaryAuthArea': 'Cumbria'
        }]);
        expect(filterLocations(array, 'Something random', 10)).toEqual([]);
    })
});
