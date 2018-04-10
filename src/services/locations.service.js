// @flow

/**
 * Fetches the locations from the upstream API
 * @returns {Promise.<T>} response: The response object
 * @throws {Error}: Generic error
 */
export function fetchLocations() {
    return fetch(process.env.PUBLIC_URL + '/static/locations.json', {})
        .then(response => {
            if (!response.ok) {
                throw Error(response.status);
            }
            return response.json();
        })
        .catch(error => {
            throw Error(error);
        });
}

/**
 * Filters an array of locations by name, based on a given
 * search query and max results
 * @param {Array} locations: An array of location objects
 * @param {string} searchText: A search query
 * @param {number} maxResults: The max results length
 * @returns {Array.<T>}: The filtered locations array
 */
export function filterLocations(locations, searchText, maxResults) {
    return locations.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
    }).filter(location => {
        return location.name.toLowerCase().includes(searchText.toLowerCase());
    }).slice(0, maxResults);
}