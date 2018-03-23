// @flow
export function fetchWeather() {
    let header = new Headers({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    });
    return fetch('http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/sitelist?key='+process.env.REACT_APP_DATAPOINT_API_KEY, {
        headers: header
    })
        .then(response => {
            if (!response.ok) {
                throw Error(response.status);
            }
            return response.json();
        })
        .catch(error => error);
}