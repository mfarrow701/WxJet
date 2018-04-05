// @flow
export function fetchLocations() {
    return fetch('/static/locations.json', {})
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

export function filterLocations(locations, searchText, maxResults) {
    return locations.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
    }).filter(location => {
        return location.name.toLowerCase().includes(searchText.toLowerCase());
    }).slice(0, maxResults);
}