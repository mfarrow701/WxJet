// @flow
export function fetchForecast(location) {
    return fetch('//datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/' + location + '?res=daily&key=' + process.env.REACT_APP_DATAPOINT_API_KEY)
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