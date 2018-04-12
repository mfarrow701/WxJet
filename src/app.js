// @flow
import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {locationSelected} from './actions/location.actions';
import Dashboard from './containers/dashboard/dashboard';
import Profile from './containers/profile/profile';
import Chart from './containers/chart/chart';
import Settings from './containers/settings/settings';
import NotFound from './containers/not-found/not-found';
import Search from './components/location/search';
import Logo from './core/assets/logo.svg';
import './app.css';

class App extends Component {
    logoMessage = 'WxJet';
    searchMessage = 'Search for a location';

    constructor() {
        super();
        this.state = {
            appLoaded: false
        }
    }

    componentWillMount() {
        let storedLocation = localStorage.getItem('storedLocation');
        if (storedLocation) {
            this.props.selectLocation(JSON.parse(storedLocation));
        }
    }

    componentDidMount() {
        this.setState({
            appLoaded: true,
        })
    }

    render() {
        if (this.state.appLoaded) {
            const themeClass = classNames(
                this.props.themeIsDark ? 'Dark' : 'Light'
            );

            return (
                <ConnectedRouter history={this.props.history}>
                    <div className="App">
                        <header className={themeClass}>
                            <img alt={this.logoMessage}
                                 className="Logo"
                                 onClick={() => {
                                     this.props.history.push('/')
                                 }}
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
                                    <Route path="/profile" component={Profile}/>
                                    <Route path="/charts" component={Chart}/>
                                    <Route path="/settings" component={Settings}/>
                                    <Route component={NotFound}/>
                                </Switch>
                            )}
                        </main>
                        <footer className={themeClass}>
                            <button onClick={() => {
                                this.props.history.push('/')
                            }}>
                                <div className={'Home-Icon Icon ' + themeClass}/>
                            </button>
                            <button onClick={() => {
                                this.props.history.push('/profile')
                            }}>
                                <div className={'Profile-Icon Icon ' + themeClass}/>
                            </button>
                            <button onClick={() => {
                                this.props.history.push('/charts')
                            }}>
                                <div className={'Chart-Icon Icon ' + themeClass}/>
                            </button>
                            <button onClick={() => {
                                this.props.history.push('/settings')
                            }}>
                                <div className={'Settings-Icon Icon ' + themeClass}/>
                            </button>
                        </footer>
                    </div>
                </ConnectedRouter>
            )
        } else {
            return <h1>Loading</h1>
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
        clearLocation: location => dispatch(locationSelected(null)),
        selectLocation: location => dispatch(locationSelected(location))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
