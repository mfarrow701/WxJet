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
import Pressure from '../../components/weather/pressure';

let socket, socketOptions = {
    reconnectionAttempts: 3,
    reconnectionDelay: 3000
}, sse;

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            sseNotification: {
                message: ''
            },
            socketNotification: {
                colourState: '#333333',
                message: ''
            }
        }
    }

    componentDidMount() {
        this.props.requestForecast([this.props.selectedLocation.longitude, this.props.selectedLocation.latitude]);
        this.subscribeSSENotifications();
        this.subscribeSocketNotifications();
    }

    componentWillUnmount() {
        this.unsubscribeSocketNotifications();
        this.unsubscribeSSENotifications();
    }

    render() {
        let body,
            updateMessage, forecast;
        if (this.props.forecastFetching || this.props.forecastPayload === null) {
            body = <Loading/>
        } else {
            forecast = this.props.forecastPayload.features[0].properties.time_series[0];
            updateMessage = 'United Kingdom, updated 1 min ago';
            const isAirfield = this.props.selectedLocation['name'].toLowerCase().includes('airport') || this.props.selectedLocation['name'].toLowerCase().includes('miramar'),
                isThresholdExceeded = this.props.notificationsThreshold >= forecast['3_okta_cloud_base_height'];
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
                            <Pressure value={parseInt(forecast['mean_sea_level_pressure'].toString().slice(0, -2), 10)}
                                      altitude={this.props.forecastPayload.features[0].properties.altitude}/>
                        </div>
                    </div>

                    {isThresholdExceeded &&
                    <div className="Card">
                        <div className="Content">
                            <h5>{'Your ' + this.props.notificationsThreshold + 'ft threshold has been exceeded'}</h5>
                        </div>
                    </div>
                    }

                    <div className="Card"
                         style={{borderTop: '10px solid ' + this.state.socketNotification.colourState}}>
                        <div className="Content">
                            <h5>Websocket notifications</h5>
                            <p>{this.state.socketNotification.message || 'Unable to retrieve socket notifications'}</p>
                        </div>
                    </div>

                    {isAirfield &&
                    <div className="Card"
                         style={{borderTop: '10px solid ' + this.state.sseNotification.colourState}}>
                        <div className="Content">
                            <h5>Server-sent notifications</h5>
                            <p>{this.state.sseNotification.message || 'Unable to retrieve SSE notifications'}</p>
                        </div>
                    </div>
                    }
                </Fragment>
            );
        }
        return (
            <div className="Dashboard">
                {body}
            </div>
        )
    }

    subscribeSSENotifications() {
        if (typeof(EventSource) !== 'undefined') {
            sse = new EventSource('http://localhost:3001/sse-notifications', {withCredentials: true});
            sse.onmessage = (event) => {
                this.setState({
                    sseNotification: JSON.parse(event.data)
                });
            };
        } else {
            console.log('Your browser does not support server-sent events!');
        }
    }

    unsubscribeSSENotifications() {
        if (typeof(EventSource) !== 'undefined') {
            sse.close();
        }
    }

    subscribeSocketNotifications() {
        if ('WebSocket' in window) {
            socket = io('http://localhost:3001', socketOptions);
            socket.on('notification', notificationType => {
                if (Notification.permission === 'granted' && notificationType.colourState === '#9932CC') {
                    // Only send a web notification if the API is enabled and
                    // the notification state is 'red' (highest priority)
                    navigator.serviceWorker.getRegistration().then(reg => {
                        const options = {
                            badge: process.env.PUBLIC_URL + '/favicons/apple-touch-icon.png',
                            body: notificationType.message,
                            icon: process.env.PUBLIC_URL + '/favicons/apple-touch-icon.png',
                            vibrate: [500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40, 500]
                        };
                        reg.showNotification('Warning!', options);
                    });
                }
                this.setState({
                    socketNotification: notificationType
                });
            });
            socket.emit('subscribeToNotifications');
        } else {
            console.log('Your browser does not support websockets!');
        }
    }

    unsubscribeSocketNotifications() {
        if ('WebSocket' in window) {
            socket.off('notification');
            socket.disconnect();
        }
    }
}

const mapStateToProps = state => {
    return {
        forecastPayload: state.forecastReducer.payload,
        forecastFetching: state.forecastReducer.fetching,
        selectedLocation: state.locationsReducer.selectedLocation,
        notificationsThreshold: state.settings.notificationsThreshold
    };
};

const mapDispatchToProps = dispatch => {
    return {
        requestForecast: selectedLocation => dispatch(forecastAPIRequest(selectedLocation))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);