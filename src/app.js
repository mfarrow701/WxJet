// @flow
import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import {connect} from 'react-redux';
import {locationSelected} from './actions/location.actions';
import Dashboard from './containers/dashboard/dashboard';
import NotFound from './containers/not-found/not-found';
import Search from './components/location/search';
import Logo from './core/assets/logo.svg';
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
                                    <Route component={NotFound}/>
                                </Switch>
                            )}
                        </main>
                        <footer className="Footer">
                            <div className="Item">
                                <img
                                    alt=""
                                    src={SearchIcon}/>
                                <p>Home</p>
                            </div>
                            <div className="Item">
                                <img
                                    alt=""
                                    src={SearchIcon}/>
                                <p>Map</p>
                            </div>
                            <div className="Item">
                                <img
                                    alt=""
                                    src={SearchIcon}/>
                                <p>Text</p>
                            </div>
                            <div className="Item">
                                <img
                                    alt=""
                                    src={SearchIcon}/>
                                <p>Chart</p>
                            </div>
                            <div className="Item">
                                <img
                                    alt=""
                                    src={SearchIcon}/>
                                <p>More</p>
                            </div>
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
        clearLocation: location => dispatch(locationSelected(null))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);