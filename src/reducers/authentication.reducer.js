// @flow
import {
    SIGN_IN_SUCCESS,
    SIGN_IN_REQUEST,
    SIGN_IN_FAILURE,
    SIGN_OUT_SUCCESS
} from '../actions/authentication.actions';



const initialState = {
    isAuthenticated: false,
    isAuthenticating: false,
    authenticatedUser: null
};

export function handleAuthenticationActions(state = initialState, action) { // NOSONAR
    const {payload, type} = action;
    switch (type) {
        case SIGN_IN_SUCCESS:
            return {...state, isAuthenticating: false, isAuthenticated: true, authenticatedUser: payload};
        case SIGN_IN_REQUEST:
            return {...state, isAuthenticating: true, isAuthenticated: false, authenticatedUser: null};
        case SIGN_IN_FAILURE:
            return {...state, isAuthenticating: false, isAuthenticated: false, authenticatedUser: null};
        case SIGN_OUT_SUCCESS:
            return {...state, isAuthenticating: true, isAuthenticated: false, authenticatedUser: null};
        default:
            return state;
    }
}