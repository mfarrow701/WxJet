// @flow
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {DateTime} from 'luxon';
import {client} from '../../appSync';
import CreateNotificationMutation from '../../queries/createNotification';
import {forecastAPIRequest} from '../../actions/forecast.actions';
import Loading from '../../components/loading/loading';
import Time from '../../components/time/time';
import FlightRule from '../../components/weather/flight-rule';
import City from '../../components/location/city';
import Country from '../../components/location/country';
import './dashboard.css';
import Pressure from '../../components/weather/pressure';
import Status from '../../components/weather/status';

class Dashboard extends Component {

    componentDidMount() {
        this.props.requestForecast([this.props.selectedLocation.longitude, this.props.selectedLocation.latitude]);
    }

    render() {
        let body,
            updateMessage, forecast;
        if (this.props.forecastFetching || this.props.forecastPayload === null) {
            body = <Loading/>
        } else {
            forecast = this.props.forecastPayload;
            updateMessage = this.props.selectedLocation.unitaryAuthArea + ', updated 1 min ago';
            let appSyncNotification = {
                message: 'No new notifications from AppSync',
                state: '#333333'
            };
            if (this.props.nextNotifications) appSyncNotification.message = this.props.nextNotifications.data.onCreateNotification.message;
            body = (
                <Fragment>
                    <Status/>
                    <div className="Location-Card">
                        <City value={this.props.selectedLocation.name}/>
                        <Country value={updateMessage}/>
                    </div>
                    <div className="Grid">
                        <div className="Card Airfield-Card">
                            <div className="Content">
                                <h5>Airfield information</h5>
                                <Time format={DateTime.TIME_24_WITH_SECONDS}/>
                                <FlightRule ceiling={Math.round(forecast['5_okta_cloud_base_height']) * 3.28}
                                            visibility={Math.round(forecast['visibility'])}/>
                                <Pressure
                                    value={parseInt(forecast['mean_sea_level_pressure'].toString().slice(0, -2), 10)}
                                    altitude={this.props.forecastPayload.altitude}/>
                            </div>
                        </div>

                        <div className="Card Wind-Card">
                            <div className="Content">
                                <h5>Wind</h5>
                                <h1>{Math.ceil(forecast['10m_wind_speed'])}G{Math.ceil(forecast['10m_wind_gust'])}Kt</h1>
                                <h1>{forecast['10m_wind_direction']}°</h1>
                                <p>No threshold(s) configured</p>
                            </div>
                        </div>

                        <div className="Card Visibility-Card" style={{borderTop: '10px solid #a3d700'}}>
                            <div className="Content">
                                <h5>Visibility</h5>
                                <h1>{forecast['visibility']}m</h1>
                                <p>No threshold breach anticipated at {this.props.visibilityThreshold}m</p>
                            </div>
                        </div>

                        <div className="Card Cloud-Card" style={{borderTop: '10px solid #FF9900'}}>
                            <div className="Content">
                                <h5>Cloud</h5>
                                <h1>{forecast['3_okta_cloud_base_height']}ft</h1>
                                <p>Threshold breach of {this.props.cloudThreshold}ft anticipated at 11:00, with
                                    a negative trend of 500ft per hour</p>
                            </div>
                        </div>

                        <div className="Card Storm-Card" style={{borderTop: '10px solid #CC0033'}}>
                            <div className="Content">
                                <h5>Storms</h5>
                                <p>Severe thunderstorms & icing anticipated within a radius
                                    of {this.props.stormThreshold}nm from the
                                    aerodrome</p>
                            </div>
                        </div>

                        <div className="Card AppSync-Card"
                             style={{borderTop: '10px solid ' + appSyncNotification.message}}>
                            <div className="Content">
                                <h5>Notifications</h5>
                                <p>{appSyncNotification.message}</p>
                                {/*<Button placeholder="Notify the Avengers" onClick={this.onNewNotification}/>*/}
                            </div>
                        </div>
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

    onNewNotification = () => {
        if (this.clickLimiter) clearTimeout(this.clickLimiter);
        this.clickLimiter = setTimeout(() => {
            let message = 'Cloud threshold breach of 11000ft anticipated at ' + DateTime.local().toLocaleString(DateTime.TIME_24_SIMPLE),
                states = ['#00CED1', '#FF8C00', '#FF1493'], state;
            state = states[Math.floor(Math.random() * states.length)];
            client.mutate({
                mutation: CreateNotificationMutation,
                variables: {user_id: '4', message: message, state: state},
            });
        }, 500);
    };
}

const mapStateToProps = state => {
    return {
        forecastPayload: state.forecastReducer.payload,
        forecastFetching: state.forecastReducer.fetching,
        selectedLocation: state.locationsReducer.selectedLocation,
        cloudThreshold: state.settings.cloudThreshold,
        visibilityThreshold: state.settings.visibilityThreshold,
        windThreshold: state.settings.windThreshold,
        stormThreshold: state.settings.stormThreshold,
        nextNotifications: state.notifications.payload,
        notificationError: state.notifications.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        requestForecast: selectedLocation => dispatch(forecastAPIRequest(selectedLocation))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);