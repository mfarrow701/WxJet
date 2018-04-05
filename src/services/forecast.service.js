// @flow
import axios from 'axios';

export function fetchForecast(location) {
    return axios({
        method: 'get',
        url: 'https://api.datapoint.metoffice.gov.uk/points/v1/hourly-spot-forecast?longitude=' + location[0] + '&latitude=' + location[1]
    }).then(response => {
        return response.data;
    }).catch(error => {
        throw Error(error);
    });
}