// @flow
import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import {connect} from 'react-redux';
import {API, graphqlOperation} from 'aws-amplify';
import {notificationsSubscriptionError, notificationsSubscriptionNext} from './actions/notification.actions';
import Authentication from './containers/authentication/authentication';
import Dashboard from './containers/dashboard/dashboard';
import Admin from './containers/admin/admin';
import Profile from './containers/profile/profile';
import Settings from './containers/settings/settings';
import XSection from './containers/x-section/x-section';
import NotFound from './containers/not-found/not-found';
import Search from './components/location/search';
import AuthGuard from './routing/authGuard';
import {
    AUTH_ROUTE,
    DASHBOARD_ROUTE,
    ADMIN_ROUTE,
    PROFILE_ROUTE,
    X_SECTION_ROUTE,
    SETTINGS_ROUTE
} from './routing/routes';
import OnCreationNotificationSubscription from './queries/onCreateNotification';
import './app.css';
import Header from './components/core/header/header';
import Footer from './components/core/footer/footer';

class App extends Component {
    logoMessage = 'WxJet';

    constructor() {
        super();
        this.state = {
            appLoaded: false,
            user: null
        }
    }

    componentDidMount() {
        this.setState({
            appLoaded: true
        })
    }

    // componentDidMount() {
    //     Auth.signIn('mfarrow', 'Test1234')
    //         .then(user => {
    //             let userDetails = user.challengeParam.userAttributes;
    //             userDetails['user_id'] = users[Math.floor(Math.random() * users.length)];
    //             this.setState({
    //                 appLoaded: true,
    //                 user: userDetails
    //             });
    //             this.subscribeToAppSyncNotifications(userDetails.id);
    //         })
    //         .catch(error => {
    //             this.setState({
    //                 appLoaded: true
    //             })
    //         });
    // }
    //
    // componentWillUnmount() {
    //     if (!this.state.user) {
    //         this.unsubscribeFromAppSyncNotificiations();
    //     }
    // }

    render() {
        if (this.state.appLoaded) {
            return (
                <ConnectedRouter history={this.props.history}>
                    <div className="App">
                        <Header/>
                        <main>
                            {this.props.selectedLocation === null ? (
                                <Search />
                            ) : (
                                <Switch>
                                    <Route path={AUTH_ROUTE} component={Authentication}/>
                                    <AuthGuard exact path={DASHBOARD_ROUTE} component={Dashboard}/>
                                    <AuthGuard path={ADMIN_ROUTE} component={Admin}/>
                                    <AuthGuard path={PROFILE_ROUTE} component={Profile}/>
                                    <AuthGuard path={X_SECTION_ROUTE} component={XSection}/>
                                    <AuthGuard path={SETTINGS_ROUTE} component={Settings}/>
                                    <Route component={NotFound}/>
                                </Switch>
                            )}
                        </main>
                        <Footer/>
                    </div>
                </ConnectedRouter>
            )
        } else {
            return <h1>Loading...</h1>
        }
    }

    subscribeToAppSyncNotifications(userId) {
        this.notificationsHandler = API.graphql(graphqlOperation(OnCreationNotificationSubscription, {user_id: userId})).subscribe({
            next: this.props.dispatchNextNotification,
            error: this.props.dispatchNotificationError
        });
    }

    unsubscribeFromAppSyncNotificiations() {
        this.notificationsHandler.unsubscribe();
    }
}

const mapStateToProps = state => {
    return {
        selectedLocation: state.locationsReducer.selectedLocation
    };
};

const mapDispatchToProps = dispatch => {
    return {
        dispatchNextNotification: payload => dispatch(notificationsSubscriptionNext(payload.value)),
        dispatchNotificationError: error => dispatch(notificationsSubscriptionError(error))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
