import {Auth} from 'aws-amplify';

export function signIn(user) {
    return Auth.signIn(user.email, user.password)
        .then(user => user)
        .catch(error => {
            console.log('Sign-in error');
        });
}

export function signOut() {
    return Auth.signOut()
        .then(user => user)
        .catch(errror => {
            console.log('Sign-out error')
        });
}

export function signUp(user) {
    return Auth.signUp({
        username: user.username,
        password: user.password,
        attributes: {
            email: user.email,
            nickname: user.nickname
        }
    })
        .then(user => user)
        .catch(error => {
            console.log('Sign-up error')
        })
}