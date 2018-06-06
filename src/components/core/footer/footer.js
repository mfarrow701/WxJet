// @flow
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import classNames from 'classnames';
import {
    DASHBOARD_ROUTE,
    ADMIN_ROUTE,
    PROFILE_ROUTE,
    X_SECTION_ROUTE,
    SETTINGS_ROUTE
} from '../../../routing/routes';
import './footer.css';

class Footer extends Component {

    render() {
        const theme = this.props.themeIsDark ? 'Dark' : 'Light',
            themeClass = classNames(theme), isAuthenticated = this.props.isAuthenticated;
        return (
            <Fragment>
                {isAuthenticated &&
                <footer className={themeClass}>
                    <button onClick={() => this.props.handleRouterPush(DASHBOARD_ROUTE)}>
                        <img alt="Home" src={require('../../../core/assets/home-icon-' + theme.toLowerCase() + '.svg')}
                             title="Home"/>
                    </button>
                    <button onClick={() => this.props.handleRouterPush(ADMIN_ROUTE)}>
                        Admin
                    </button>
                    <button onClick={() => this.props.handleRouterPush(PROFILE_ROUTE)}>
                        <img alt="Profile"
                             src={require('../../../core/assets/profile-icon-' + theme.toLowerCase() + '.svg')}
                             title="Profile"/>
                    </button>
                    <button onClick={() => this.props.handleRouterPush(X_SECTION_ROUTE)}>
                        <img alt="X-Section"
                             src={require('../../../core/assets/chart-icon-' + theme.toLowerCase() + '.svg')}
                             title="X-Section"/>
                    </button>
                    <button onClick={() => this.props.handleRouterPush(SETTINGS_ROUTE)}>
                        <img alt="Settings"
                             src={require('../../../core/assets/more-icon-' + theme.toLowerCase() + '.svg')}
                             title="Settings"/>
                    </button>
                </footer>
                }
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authentication.isAuthenticated,
        themeIsDark: state.settings.themeIsDark
    };
};

const mapDispatchToProps = dispatch => {
    return {
        handleRouterPush: route => dispatch(push(route))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
