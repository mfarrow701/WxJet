import {call, put} from 'redux-saga/effects';
import {signInSuccess, signInFailure, signOutSuccess} from '../actions/authentication.actions';
import {signIn, signOut} from '../services/authentication.service';

const mockUserIds = [{
    id: '1',
    nickname: 'Rocket'
}, {
    id: '2',
    nickname: 'Groot'
}, {
    id: '3',
    nickname: 'Starlord'
}, {
    id: '4',
    nickname: 'Captain America'
}];

export function* signInGenerator(action) {
    try {
        const response = yield call(signIn, action.payload),
            user = response.challengeParam.userAttributes;
        const mockUser = mockUserIds[Math.floor(Math.random() * mockUserIds.length)];
        user['user_id'] = mockUser.id;
        user['username'] = response.username;
        user['nickname'] = mockUser.nickname;
        yield put(signInSuccess(user));
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signOutGenerator(action) {
    try {
        const response = yield call(signOut);
        yield put(signOutSuccess(response));
    } catch (error) {

    }
}