// @flow
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {DateTime} from 'luxon';
import io from 'socket.io-client';
import {forecastAPIRequest} from '../../actions/forecast.actions';
import Loading from '../../components/loading/loading';
import Temperature from '../../components/weather/temperature';
import Time from '../../components/time/time';
import FlightRule from '../../components/weather/flight-rule';
import City from '../../components/location/city';
import Country from '../../components/location/country';
import WindDirection from '../../components/weather/wind-direction';
import WindSpeed from '../../components/weather/wind-speed';
import './dashboard.css';

let socket, socketOptions = {
    reconnectionAttempts: 3,
    reconnectionDelay: 3000
};

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            notificationType: {
                colourState: '#333333',
                message: ''
            }
        }
    }

    componentDidMount() {
        this.props.requestForecast([this.props.selectedLocation.longitude, this.props.selectedLocation.latitude]);
        this.subscribeSocketNotifications();
    }

    componentWillUnmount() {
        this.unsubscribeSocketNotifications();
    }

    render() {
        let body,
            updateMessage, forecast;
        if (this.props.forecastFetching || this.props.forecastPayload === null) {
            body = <Loading/>
        } else {
            forecast = this.props.forecastPayload.features[0].properties.time_series[0];
            updateMessage = 'United Kingdom, updated 1 min ago';
            body = (
                <Fragment>
                    <div className="Location-Card">
                        <City value={this.props.selectedLocation.name}/>
                        <Country value={updateMessage}/>
                    </div>
                    <div className="Card Flight-Card">
                        <div className="Content">
                            <h5>Flight information</h5>
                            <Temperature value={Math.round(forecast['screen_temperature'])}/>
                            <Time format={DateTime.TIME_24_WITH_SECONDS}/>
                            <FlightRule ceiling={Math.round(forecast['5_okta_cloud_base_height']) * 3.28}
                                        visibility={Math.round(forecast['visibility'])}/>
                        </div>
                    </div>
                    <div className="Card Wind-Card">
                        <div className="Content">
                            <h5>Wind & pressure</h5>
                            <WindDirection value={forecast['10m_wind_direction'].toString()}/>
                            <WindSpeed value={forecast['10m_wind_speed']}/>
                        </div>
                    </div>

                    <div className="Card Cloud-Card"
                         style={{borderTop: '10px solid ' + this.state.notificationType.colourState}}>
                        <div className="Content">
                            <h5>{this.state.notificationType.message || 'Unable to retrieve notifications'}</h5>
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

    subscribeSocketNotifications() {
        socket = io('http://localhost:3001', socketOptions);
        socket.on('notification', notificationType => {
            if (Notification.permission === 'granted' && notificationType.colourState === '#FF0000') {
                // Only send a web notification if the API is enabled and
                // the notification state is 'red' (highest priority)
                navigator.serviceWorker.getRegistration().then(reg => {
                    const options = {
                        badge: process.env.PUBLIC_URL + '/favicons/apple-touch-icon.png',
                        body: notificationType.message,
                        icon: process.env.PUBLIC_URL + '/favicons/apple-touch-icon.png',
                        vibrate: [500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40, 500]
                    };
                    const title = 'Warning!';
                    reg.showNotification(title, options);
                });
            }
            this.setState({
                notificationType: notificationType
            });
        });
        socket.emit('subscribeToNotifications');
    }

    unsubscribeSocketNotifications() {
        socket.off('notification');
        socket.disconnect();
    }
}

const mapStateToProps = state => {
    return {
        forecastPayload: state.forecastReducer.payload,
        forecastFetching: state.forecastReducer.fetching,
        selectedLocation: state.locationsReducer.selectedLocation,
        notificationsEnabled: state.settings.notificationsEnabled
    };
};

const mapDispatchToProps = dispatch => {
    return {
        requestForecast: selectedLocation => dispatch(forecastAPIRequest(selectedLocation))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);