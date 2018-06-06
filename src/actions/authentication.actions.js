// @flow
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
export const SIGN_OUT_REQUEST = 'SIGN_OUT_REQUEST';
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export function signInSuccess(payload) {
    return {
        type: SIGN_IN_SUCCESS,
        payload
    }
}

export function signInRequest(payload) {
    return {
        type: SIGN_IN_REQUEST,
        payload
    }
}

export function signInFailure() {
    return {
        type: SIGN_IN_FAILURE
    }
}

export function signOutRequest() {
    return {
        type: SIGN_OUT_REQUEST
    }
}

export function signOutSuccess() {
    return {
        type: SIGN_OUT_SUCCESS
    }
}

export function signUpRequest(payload) {
    return {
        type: SIGN_UP_REQUEST,
        payload
    }
}

export function signUpSuccess(payload) {
    return {
        type: SIGN_UP_SUCCESS,
        payload
    }
}

export function signUpFailure() {
    return {
        type: SIGN_UP_FAILURE
    }
}