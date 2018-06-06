import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';
import {AUTH_ROUTE} from './routes';

const AuthGuard = ({component, ...props}) => {
    return props.isAuthenticated ? <Route {...props} component={component}/> : <Redirect to={AUTH_ROUTE}/>
};

AuthGuard.propTypes = {
    component: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func
    ])
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authentication.isAuthenticated
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthGuard);