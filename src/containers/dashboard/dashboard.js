// @flow
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {DateTime} from 'luxon';
import {forecastAPIRequest} from '../../actions/forecast.actions';
import Temperature from '../../components/weather/temperature';
import Time from '../../components/time/time';
import FlightRule from '../../components/weather/flight-rule';
import City from '../../components/location/city';
import Country from '../../components/location/country';
import WindDirection from '../../components/weather/wind-direction';
import WindSpeed from '../../components/weather/wind-speed';
import {generateRandomNumberBetweenValues} from '../../services/utils.service';
import './dashboard.css';

class Dashboard extends Component {

    componentWillMount() {
        // const lonLat = [this.props.selectedLocation.longitude, this.props.selectedLocation.latitude];
        // this.props.requestForecast(lonLat);
    }

    render() {
        let body;
        // if (this.props.forecastPayload === null || typeof this.props.forecastPayload !== 'object') {
        //     body = <Loading/>
        // } else {
        //     const forecast = this.props.forecastPayload.features[0].properties.time_series[0];
        let updateMessage = 'United Kingdom, updated 7 min ago';
        body = (
            <Fragment>
                <div className="Location-Card">
                    <City value={this.props.selectedLocation.name}/>
                    <Country value={updateMessage}/>
                </div>
                <div className="Card Cloud-Card">
                    <div className="Content">
                        <h5>Weather</h5>
                    </div>
                </div>
                <div className="Card Flight-Card">
                    <div className="Content">
                        <h5>Flight info</h5>
                        <Temperature value={generateRandomNumberBetweenValues(-4, 30)}/>
                        <Time format={DateTime.TIME_24_SIMPLE}/>
                        <FlightRule ceiling={generateRandomNumberBetweenValues(0, 20000)}
                                    visibility={generateRandomNumberBetweenValues(0, 10000)}/>
                    </div>
                </div>
                <div className="Card Wind-Card">
                    <div className="Content">
                        <h5>Wind</h5>
                        <WindDirection value={generateRandomNumberBetweenValues(0, 360).toString()}/>
                        <WindSpeed value={generateRandomNumberBetweenValues(0, 25)}/>
                    </div>
                </div>
            </Fragment>
        );
        return (
            <div className="Dashboard">
                {body}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        forecastFetching: state.forecastReducer.fetching,
        forecastPayload: state.forecastReducer.payload,
        forecastError: state.forecastReducer.error,
        selectedLocation: state.locationsReducer.selectedLocation
    };
};

const mapDispatchToProps = dispatch => {
    return {
        requestForecast: location => dispatch(forecastAPIRequest(location)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);