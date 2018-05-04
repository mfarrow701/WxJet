// @flow

const proxyService = 'https://cors-anywhere.herokuapp.com/';

/**
 * Fetches the forecast from the upstream API
 * @param {object} location: A given location object
 * @returns {Promise.<T>} response: The response object
 * @throws {Error}: Generic error
 */
export function fetchForecast(location) {
    return fetch(proxyService + 'https://api.datapoint.metoffice.gov.uk/points/v1/hourly-spot-forecast?longitude=' + location[0] + '&latitude=' + location[1], {
        headers: new Headers({
            'api-key': process.env.REACT_APP_DATAPOINT_API_KEY
        })
    }).then(response => {
        if (!response.ok) {
            throw Error(response.status);
        }
        return response.json();
    }).catch(error => {
        throw Error(error);
    });
}