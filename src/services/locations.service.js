// @flow
export function fetchLocations() {
    return fetch('//datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/sitelist?key=' + process.env.REACT_APP_DATAPOINT_API_KEY, {})
        .then(response => {
            if (!response.ok) {
                throw Error(response.status);
            }
            return response.json();
        })
        .catch(error => error);
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