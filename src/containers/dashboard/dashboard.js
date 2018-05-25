// @flow
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {DateTime} from 'luxon';
import io from 'socket.io-client';
import {client} from '../../appSync';
import OnCreateNotificationMutation from '../../queries/onCreateNotification';
import {forecastAPIRequest} from '../../actions/forecast.actions';
import {pollNotificationsAPIRequest} from '../../actions/notification.actions';
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
}, sse, sseErrorCount = 0, proxyService = 'http://localhost:3001/';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            sseNotification: {
                colourState: '#333333',
                message: ''
            },
            socketNotification: {
                colourState: '#333333',
                message: ''
            },
            appSyncNotification: {
                colourState: '#333333',
                message: ''
            }
        }
    }

    componentDidMount() {
        this.props.requestForecast([this.props.selectedLocation.longitude, this.props.selectedLocation.latitude]);
        this.subscribeSSENotifications();
        this.subscribeSocketNotifications();
        this.props.pollNotifications();
        this.notificationsPollInterval = setInterval(() => this.props.pollNotifications(), 10000);
        client
            .subscribe({
                query: OnCreateNotificationMutation
            })
            .subscribe({
                next: this.onCreateNotification,
                complete: console.log,
                error: console.log
            });
    }

    componentWillUnmount() {
        this.unsubscribeSocketNotifications();
        this.unsubscribeSSENotifications();
        clearInterval(this.notificationsPollInterval);
    }

    render() {
        let body,
            updateMessage, forecast;
        if (this.props.forecastFetching || this.props.forecastPayload === null) {
            body = <Loading/>
        } else {
            forecast = this.props.forecastPayload;
            updateMessage = this.props.selectedLocation.unitaryAuthArea + ', updated 1 min ago';
            const isAirfield = this.props.selectedLocation['name'].toLowerCase().includes('airport') || this.props.selectedLocation['name'].toLowerCase().includes('miramar'),
                isThresholdExceeded = this.props.notificationsThreshold >= forecast['3_okta_cloud_base_height'];
            body = (
                <Fragment>
                    <div className="Location-Card">
                        <City value={this.props.selectedLocation.name}/>
                        <Country value={updateMessage}/>
                    </div>
                    <div className="Grid">
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
                                <Pressure
                                    value={parseInt(forecast['mean_sea_level_pressure'].toString().slice(0, -2), 10)}
                                    altitude={this.props.forecastPayload.altitude}/>
                            </div>
                        </div>

                        {isThresholdExceeded &&
                        <div className="Card">
                            <div className="Content">
                                <h5>{this.props.notificationsThreshold}ft cloud threshold exceeded</h5>
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

                        {this.props.pollNotificationsPayload ? (
                            <div className="Card"
                                 style={{borderTop: '10px solid ' + this.props.pollNotificationsPayload.colourState}}>
                                <div className="Content">
                                    <h5>Poll notifications</h5>
                                    {this.props.notificationsThreshold > this.props.pollNotificationsPayload.value &&
                                    <p>{this.props.notificationsThreshold}ft cloud threshold exceeded</p>}
                                </div>
                            </div>
                        ) : (
                            <div className="Card">
                                <div className="Content">
                                    <h5>Poll notifications</h5>
                                    <p>Unable to retrieve Poll notifications</p>
                                </div>
                            </div>
                        )}

                        <div className="Card"
                             style={{borderTop: '10px solid ' + this.state.appSyncNotification.colourState}}>
                            <div className="Content">
                                <h5>AppSync Notifications</h5>
                                <p>{this.state.appSyncNotification.message || 'No new notifications from AppSync'}</p>
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

    onCreateNotification = (payload) => {
        let notification = payload.data['onCreateNotification'];
        this.setState({
            appSyncNotification: {
                colourState: notification.state,
                message: notification.message
            }
        });
    };

    subscribeSSENotifications() {
        if (typeof(EventSource) !== 'undefined') {
            sse = new EventSource(proxyService + 'sse-notifications', {withCredentials: true});
            sse.onmessage = (event) => {
                this.setState({
                    sseNotification: JSON.parse(event.data)
                });
            };
            sse.onerror = (event) => {
                sseErrorCount++;
                if (sseErrorCount >= 3) sse.close();
            }
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
            socket = io(proxyService, socketOptions);
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
        notificationsThreshold: state.settings.notificationsThreshold,
        pollNotificationsFetching: state.notifications.fetching,
        pollNotificationsPayload: state.notifications.payload,
        pollNotificationsError: state.notifications.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        requestForecast: selectedLocation => dispatch(forecastAPIRequest(selectedLocation)),
        pollNotifications: () => dispatch(pollNotificationsAPIRequest())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);