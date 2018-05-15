// @flow
import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {locationSelected} from './actions/location.actions';
import Authentication from './containers/authentication/authentication';
import Dashboard from './containers/dashboard/dashboard';
import Profile from './containers/profile/profile';
import Settings from './containers/settings/settings';
import XSection from './containers/x-section/x-section';
import NotFound from './containers/not-found/not-found';
import Search from './components/location/search';
import Logo from './core/assets/logo.svg';
import './app.css';

class App extends Component {
    logoMessage = 'WxJet';

    constructor() {
        super();
        this.state = {
            appLaunched: false
        }
    }

    componentDidMount() {
        this.setState({
            appLaunched: true
        })
    }

    render() {
        if (this.state.appLaunched) {
            const themeClass = classNames(
                this.props.themeIsDark ? 'Dark' : 'Light'
            );
            return (
                <ConnectedRouter history={this.props.history}>
                    <div className="App">
                        <header className={themeClass}>
                            <img alt={this.logoMessage}
                                 className="Logo"
                                 onClick={() => this.handleNavigationClick('/')}
                                 src={Logo}
                                 title={this.logoMessage}/>
                            {this.props.selectedLocation !== null &&
                            <div className={'Search-Icon Icon ' + themeClass}
                                 onClick={this.props.clearLocation}/>}
                        </header>
                        <main>
                            {this.props.selectedLocation === null ? (
                                <Search />
                            ) : (
                                <Switch>
                                    <Route exact path="/" component={Dashboard}/>
                                    <Route path="/dashboard" component={Dashboard}/>
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
                                <div className={'Home-Icon Icon ' + themeClass}/>
                            </button>
                            <button onClick={() => this.handleNavigationClick('/profile')}>
                                <div className={'Profile-Icon Icon ' + themeClass}/>
                            </button>
                            <button onClick={() => this.handleNavigationClick('/x-section')}>
                                <div className={'Chart-Icon Icon ' + themeClass}/>
                            </button>
                            <button onClick={() => this.handleNavigationClick('/settings')}>
                                <div className={'Settings-Icon Icon ' + themeClass}/>
                            </button>
                        </footer>
                    </div>
                </ConnectedRouter>
            )
        } else {
            // return <Portal navigateToApp={() => this.setState({appLaunched: true})}/>
            return <h1>Loading...</h1>
        }
    }

    handleNavigationClick(route) {
        if (route !== this.props.history.location.pathname) {
            this.props.history.push(route);
        }
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
        clearLocation: location => dispatch(locationSelected(null))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
