// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setNotificationState, setThemeState, setAircraftType } from '../../actions/settings.actions';
import Switch from '../../components/switch/switch';
import './settings.css'

class Settings extends Component {

    render() {
        return (
            <div className="Settings">
                <h1>Settings</h1>
                <p>Notifications</p>
                <Switch checked={this.props.notificationsEnabled} handleChange={this.props.setNotificationState} />
                <p>{this.props.themeIsDark ? 'Dark' : 'Light'} theme</p>
                <Switch checked={this.props.themeIsDark} handleChange={this.props.setThemeState} />
                <p>{this.props.typeIsFixedWing ? 'Fixed' : 'Rotary'} wing</p>
                <Switch checked={this.props.typeIsFixedWing} handleChange={this.props.setAircraftType} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        notificationsEnabled: state.settings.notificationsEnabled,
        themeIsDark: state.settings.themeIsDark,
        typeIsFixedWing: state.settings.typeIsFixedWing
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setNotificationState: () => dispatch(setNotificationState()),
        setThemeState: () => dispatch(setThemeState()),
        setAircraftType: () => dispatch(setAircraftType())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);