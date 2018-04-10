// @flow
import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import {connect} from 'react-redux';
import {locationSelected} from './actions/location.actions';
import Dashboard from './containers/dashboard/dashboard';
import Profile from './containers/profile/profile';
import Settings from './containers/settings/settings';
import NotFound from './containers/not-found/not-found';
import Search from './components/location/search';
import Logo from './core/assets/logo.svg';
import ChartIcon from './core/assets/chart-icon.svg';
import HomeIcon from './core/assets/home-icon.svg';
import MoreIcon from './core/assets/more-icon.svg';
import ProfileIcon from './core/assets/profile-icon.svg';
import SearchIcon from './core/assets/search-icon.svg';
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
        if(storedLocation) {
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
            return (
                <ConnectedRouter history={this.props.history}>
                    <div className="App">
                        <header className="Header">
                            <img alt={this.logoMessage}
                                 className="Logo"
                                 onClick={() => { this.props.history.push('/') }}
                                 src={Logo}
                                 title={this.logoMessage}/>
                            {this.props.selectedLocation !== null &&
                            <img alt={this.searchMessage}
                                 className="Search-icon"
                                 onClick={this.props.clearLocation}
                                 src={SearchIcon}
                                 title={this.searchMessage}/>}
                        </header>
                        <main className="Main">
                            {this.props.selectedLocation === null ? (
                                <Search />
                            ) : (
                                <Switch>
                                    <Route exact path="/" component={Dashboard}/>
                                    <Route path="/profile" component={Profile}/>
                                    <Route path="/settings" component={Settings}/>
                                    <Route component={NotFound}/>
                                </Switch>
                            )}
                        </main>
                        <footer className="Footer">
                            <button className="Item" onClick={() => { this.props.history.push('/') }}>
                                <img
                                    alt="Home"
                                    src={HomeIcon}
                                    title="Home"/>
                            </button>
                            <button className="Item" onClick={() => { this.props.history.push('/profile') }}>
                                <img
                                    alt="Profile"
                                    src={ProfileIcon}
                                    title="Profile"/>
                            </button>
                            <button className="Item" onClick={() => { this.props.history.push('/charts') }}>
                                <img
                                    alt="Charts"
                                    src={ChartIcon}
                                    title="Charts"/>
                            </button>
                            <button className="Item" onClick={() => { this.props.history.push('/settings') }}>
                                <img
                                    alt="Settings"
                                    src={MoreIcon}
                                    title="Settings"/>
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
        selectedLocation: state.locationsReducer.selectedLocation
    };
};

const mapDispatchToProps = dispatch => {
    return {
        clearLocation: location => dispatch(locationSelected(null)),
        selectLocation: location => dispatch(locationSelected(location))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
