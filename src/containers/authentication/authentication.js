// @flow
import React, {Component, Fragment} from 'react';
import Logo from '../../core/assets/logo.svg';
import './authentication.css';

class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        };
    }

    render() {
        let body;
        if (true) {
            body = (
                <Fragment>
                    <img alt="" src={Logo}/>
                    <input type="text" onChange={this.onEmailChange} placeholder="Email"/>
                    <input type="password" onChange={this.onPasswordChange} placeholder="Password"/>
                    <button onClick={this.onSignInClick}>Sign in</button>
                    <p>Not registered?</p>
                </Fragment>
            )
        } else {
            body = (
                <Fragment>
                    <img alt="" src=""/>
                    <input type="text"/>
                    <input type="password"/>
                </Fragment>
            )
        }
        return (
            <div className="Authentication">
                {body}
            </div>
        )
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value});
    };

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    };

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    };

    onSignInClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    onSignUpClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };
}

export default Authentication;