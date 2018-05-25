// @flow

/**
 * Fetches the forecast from the upstream API
 * @param {object} location: A given location object
 * @returns {Promise.<T>} response: The response object
 * @throws {Error}: Generic error
 */
export function fetchPollNotifications() {
    return fetch('http://localhost:3001/poll-notifications')
        .then(response => {
            if (!response.ok) {
                throw Error(response.status);
            }
            return response.json();
        }).catch(error => {
            throw Error(error);
        });
}