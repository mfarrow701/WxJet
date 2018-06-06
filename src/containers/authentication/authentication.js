// @flow
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {signInRequest} from '../../actions/authentication.actions';
import {DASHBOARD_ROUTE} from '../../routing/routes';
import Logo from '../../core/assets/logo.svg';
import './authentication.css';

class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            formErrors: {email: '', password: ''},
            emailValid: false,
            passwordValid: false,
            formValid: false,
            isSignIn: true
        };
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to={DASHBOARD_ROUTE}/>
        }
        let body;
        if (this.state.isSignIn) {
            body = (
                <Fragment>
                    <img alt="" src={Logo}/>
                    <input onChange={this.onInput} name="email" placeholder="Email" type="email"
                           value={this.state.email}
                           style={{borderBottom: this.state.emailValid ? '4px solid green' : '4px solid red'}}/>
                    <input onChange={this.onInput} name="password" placeholder="Password" type="password"
                           value={this.state.password}
                           style={{borderBottom: this.state.passwordValid ? '4px solid green' : '4px solid red'}}/>
                    <button type="submit" disabled={!this.state.formValid}>Sign in</button>
                    <FormErrors formErrors={this.state.formErrors}/>
                    {/*<p onClick={this.onFormSwitch}>Not registered?</p>*/}
                </Fragment>
            )
        } else {
            body = (
                <Fragment>
                    <img alt="" src={Logo}/>
                    <input onChange={this.onInput} name="name" placeholder="Name (Optional)" type="text"
                           value={this.state.name}/>
                    <input onChange={this.onInput} name="email" placeholder="Email" type="email"
                           value={this.state.email}
                           style={{borderBottom: this.state.emailValid ? '4px solid green' : '4px solid red'}}/>
                    <input onChange={this.onInput} name="password" placeholder="Password" type="password"
                           value={this.state.password}
                           style={{borderBottom: this.state.passwordValid ? '4px solid green' : '4px solid red'}}/>
                    <button type="submit" disabled={!this.state.formValid}>Sign up</button>
                    <FormErrors formErrors={this.state.formErrors}/>
                    <p onClick={this.onFormSwitch}>Already registered?</p>
                </Fragment>
            )
        }
        return (
            <form autoComplete="on" className="Authentication" onSubmit={this.onFormSubmit}>
                {body}
            </form>
        )
    }

    onInput = (event) => {
        const fieldName = event.target.name, fieldValue = event.target.value;
        this.setState({[fieldName]: fieldValue}, () => {
            this.validateInput(fieldName, fieldValue)
        });
    };

    onFormSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (this.state.isSignIn) {
            let payload = {
                email: this.state.email,
                password: this.state.password
            };
            // Sign-in here!
            this.props.signIn(payload)
        } else {
            // Register here!
        }
    };

    onFormSwitch = (event) => {
        this.setState({
            name: '',
            email: '',
            password: '',
            formErrors: {email: '', password: ''},
            emailValid: false,
            passwordValid: false,
            isSignIn: !this.state.isSignIn
        })
    };

    validateInput(fieldName, fieldValue) {
        let formErrors = this.state.formErrors,
            emailValid = this.state.emailValid,
            passwordValid = this.state.passwordValid;

        switch (fieldName) {
            case 'email':
                emailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$/.test(fieldValue);
                formErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = /^(?=^.{6,}$)((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.*$/.test(fieldValue);
                formErrors.password = passwordValid ? '' : ' does not match';
                break;
            default:
                break;
        }

        this.setState({
            formErrors: formErrors,
            emailValid: emailValid,
            passwordValid: passwordValid,
            formValid: emailValid && passwordValid
        })
    }
}

export class FormErrors extends Component {

    render() {
        const formErrors = this.props.formErrors;
        return (
            Object.keys(formErrors).map((fieldName, i) => {
                return formErrors[fieldName].length > 0 ? <p key={i}>{fieldName} {formErrors[fieldName]}</p> : '';
            })
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authentication.isAuthenticated
    };
};

const mapDispatchToProps = dispatch => {
    return {
        signIn: payload => dispatch(signInRequest(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
