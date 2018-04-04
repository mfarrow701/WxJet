// @flow
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {DateTime, Interval} from 'luxon';
import {forecastAPIRequest} from '../../actions/forecast.actions';
import Temperature from '../../components/weather/temperature';
import Time from '../../components/time/time';
import FlightRule from '../../components/weather/flight-rule';
import City from '../../components/location/city';
import Country from '../../components/location/country';
import WindDirection from '../../components/weather/wind-direction';
import WindSpeed from '../../components/weather/wind-speed';
import Pressure from '../../components/weather/pressure';
import './dashboard.css';
import Loading from '../../components/loading/loading';

class Dashboard extends Component {

    componentWillMount() {
        this.props.requestForecast(this.props.selectedLocation.id);
    }

    render() {
        let body;
        if (this.props.forecastPayload === null || typeof this.props.forecastPayload !== 'object') {
            body = <Loading/>
        } else {
            const forecast = this.props.forecastPayload.SiteRep.DV.Location.Period[0].Rep, updated = this.props.forecastPayload.SiteRep.DV.dataDate;
            let day = forecast[0], 
                night = forecast[1], 
                updateMessage = "United Kingdom, " + Math.round(Interval.fromDateTimes(DateTime.fromISO(updated), DateTime.local()).length('minutes', true)) + " min ago";
            body = (
                <Fragment>
                    <div className="First">
                        <City value={this.props.selectedLocation.name}/>
                        <Country value={updateMessage}/>
                    </div>
                    <div className="Second">
                        {/*<WeatherIcon icon={BlowingSnow}/>*/}
                    </div>
                    <div className="Third">
                        <Temperature value={parseInt(day.Dm)}/>
                        <Time format={DateTime.TIME_24_SIMPLE}/>
                        <FlightRule/>
                    </div>
                    <div className="Fourth">
                        <WindDirection value={day.D}/>
                        <WindSpeed value={parseInt(day.S)}/>
                    </div>
                </Fragment>
            );
        }
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