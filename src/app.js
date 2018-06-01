// @flow
import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {client} from './appSync'
import {locationSelected} from './actions/location.actions';
import {notificationsSubscriptionError, notificationsSubscriptionNext} from './actions/notification.actions';
import Authentication from './containers/authentication/authentication';
import Dashboard from './containers/dashboard/dashboard';
import Admin from './containers/admin/admin';
import Profile from './containers/profile/profile';
import Settings from './containers/settings/settings';
import XSection from './containers/x-section/x-section';
import NotFound from './containers/not-found/not-found';
import Search from './components/location/search';
import Logo from './core/assets/logo.svg';
import OnCreationNotificationSubscription from './queries/onCreateNotification';
import GetUserQuery from './queries/getUser';
import './app.css';

let users = ['1', '2', '3', '4'];

class App extends Component {
    logoMessage = 'WxJet';

    constructor() {
        super();
        this.state = {
            user: null
        }
    }

    componentDidMount() {
        let mockUser = users[Math.floor(Math.random() * users.length)];
        client.query({
            query: GetUserQuery,
            variables: {id: mockUser}
        }).then((user) => {
            let subscribedUser = user.data.getUser;
            this.setState({
                user: subscribedUser
            });
            this.subscribeToAppSyncNotifications(subscribedUser.id);
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAppSyncNotificiations();
    }

    render() {
        if (this.state.user) {
            const theme = this.props.themeIsDark ? 'Dark' : 'Light',
                themeClass = classNames(theme);
            const profileIcon = this.state.user.nickname.split(' ').join('').toLowerCase();
            return (
                <ConnectedRouter history={this.props.history}>
                    <div className="App">
                        <header className={themeClass}>
                            <img alt={this.logoMessage}
                                 className="Logo"
                                 onClick={() => this.handleNavigationClick('/')}
                                 src={Logo}
                                 title={this.logoMessage}/>
                            <div className="Secondary">
                                <img alt={this.state.user.nickname}
                                     className="Profile-Icon"
                                     src={require('./core/assets/' + profileIcon + '-icon.svg')}
                                     title={this.state.user.nickname}/>
                                {this.props.selectedLocation !== null &&
                                <img alt="Search for a location..."
                                     className="Search-Icon"
                                     onClick={this.props.clearLocation}
                                     src={require('./core/assets/search-icon-' + theme.toLowerCase() + '.svg')}
                                     title="Search for a location..."/> }
                            </div>
                        </header>
                        <main>
                            {this.props.selectedLocation === null ? (
                                <Search />
                            ) : (
                                <Switch>
                                    <Route exact path="/" component={Dashboard}/>
                                    <Route path="/dashboard" component={Dashboard}/>
                                    <Route path="/admin" component={Admin}/>
                                    <Route path="/profile" component={Profile}/>
                                    <Route path="/authenticate" component={Authentication}/>
                                    <Route path="/x-section" component={XSection}/>
                                    <Route path="/settings" component={Settings}/>
                                    <Route component={NotFound}/>
                                </Switch>
                            )}
                        </main>
                        <footer className={themeClass}>
                            <button onClick={() => this.handleNavigationClick('/dashboard')}>
                                <img alt="Home" src={require('./core/assets/home-icon-' + theme.toLowerCase() + '.svg')}
                                     title="Home"/>
                            </button>
                            <button onClick={() => this.handleNavigationClick('/admin')}>
                                Admin
                            </button>
                            <button onClick={() => this.handleNavigationClick('/profile')}>
                                <img alt="Profile"
                                     src={require('./core/assets/profile-icon-' + theme.toLowerCase() + '.svg')}
                                     title="Profile"/>
                            </button>
                            <button onClick={() => this.handleNavigationClick('/x-section')}>
                                <img alt="X-Section"
                                     src={require('./core/assets/chart-icon-' + theme.toLowerCase() + '.svg')}
                                     title="X-Section"/>
                            </button>
                            <button onClick={() => this.handleNavigationClick('/settings')}>
                                <img alt="Settings"
                                     src={require('./core/assets/more-icon-' + theme.toLowerCase() + '.svg')}
                                     title="Settings"/>
                            </button>
                        </footer>
                    </div>
                </ConnectedRouter>
            )
        } else {
            return <h1>Loading...</h1>
        }
    }

    handleNavigationClick(route) {
        if (route !== this.props.history.location.pathname) {
            this.props.history.push(route);
        }
    }

    subscribeToAppSyncNotifications(userId) {
        this.notificationsHandler = client.subscribe({
            query: OnCreationNotificationSubscription,
            variables: {user_id: userId}
        }).subscribe({
            next: this.props.dispatchNextNotification,
            error: this.props.dispatchNotificationError
        })
    }

    unsubscribeFromAppSyncNotificiations() {
        this.notificationsHandler.unsubscribe();
    }
}

const mapStateToProps = state => {
    return {
        selectedLocation: state.locationsReducer.selectedLocation,
        themeIsDark: state.settings.themeIsDark
    };
};

const mapDispatchToProps = dispatch => {
    return {
        clearLocation: location => dispatch(locationSelected(null)),
        dispatchNextNotification: payload => dispatch(notificationsSubscriptionNext(payload)),
        dispatchNotificationError: error => dispatch(notificationsSubscriptionError(error))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
