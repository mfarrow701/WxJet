// @flow

/**
 * Fetches the forecast from the upstream API
 * @param {object} location: A given location object
 * @returns {Promise.<T>} response: The response object
 * @throws {Error}: Generic error
 */
export function fetchForecast(location) {
    return fetch('https://api.datapoint.metoffice.gov.uk/points/v1/hourly-spot-forecast?longitude=' + location[0] + '&latitude=' + location[1])
        .then(response => {
            if (!response.ok) {
                throw Error(response.status);
            }
            return response.json();
        }).catch(error => {
            throw Error(error);
        });
}