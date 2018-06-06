// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import Logo from '../../../core/assets/logo.svg';
import {locationSelected} from '../../../actions/location.actions';
import {signOutRequest} from '../../../actions/authentication.actions';
import './header.css';

class Header extends Component {

    render() {
        const theme = this.props.themeIsDark ? 'Dark' : 'Light',
            themeClass = classNames(theme), authenticatedUser = this.props.authenticatedUser;
        return (
            <header className={themeClass}>
                <img alt={this.logoMessage}
                     className="Logo"
                     src={Logo}
                     title={this.logoMessage}/>
                { this.props.isAuthenticated &&
                <div className="Secondary">
                    <h6>{authenticatedUser['nickname']}</h6>
                    <img alt="Click to sign out"
                         className="Profile-Icon"
                         onClick={this.props.signOut}
                         src={require('../../../core/assets/user' + authenticatedUser['user_id'] + '-icon.svg')}
                         title="Click to sign out"/>
                    {this.props.selectedLocation !== null &&
                    <img alt="Search for a location..."
                         className="Search-Icon"
                         onClick={this.props.clearLocation}
                         src={require('../../../core/assets/search-icon-' + themeClass.toLowerCase() + '.svg')}
                         title="Search for a location..."/> }
                </div>
                }
            </header>
        )
    }
}

const mapStateToProps = state => {
    return {
        authenticatedUser: state.authentication.authenticatedUser,
        isAuthenticated: state.authentication.isAuthenticated,
        selectedLocation: state.locationsReducer.selectedLocation,
        themeIsDark: state.settings.themeIsDark
    };
};

const mapDispatchToProps = dispatch => {
    return {
        clearLocation: location => dispatch(locationSelected(null)),
        signOut: () => dispatch(signOutRequest())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
