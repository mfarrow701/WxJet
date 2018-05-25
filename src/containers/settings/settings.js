// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setNotificationThreshold, setThemeState, setAircraftType} from '../../actions/settings.actions';
import Switch from '../../components/switch/switch';
import './settings.css'
import NumberInput from '../../components/core/input/number-input';

class Settings extends Component {

    render() {
        return (
            <div className="Settings">
                <h1>Settings</h1>
                <p>Notification threshold</p>
                <NumberInput name="notificationsThreshold" onChange={this.props.setNotificationThreshold}
                             value={this.props.notificationsThreshold.toString() || '' }/>
                <p>{this.props.themeIsDark ? 'Dark' : 'Light'} theme</p>
                <Switch checked={this.props.themeIsDark} handleChange={this.props.setThemeState}/>
                <p>{this.props.typeIsFixedWing ? 'Fixed' : 'Rotary'} wing</p>
                <Switch checked={this.props.typeIsFixedWing} handleChange={this.props.setAircraftType}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        notificationsThreshold: state.settings.notificationsThreshold,
        themeIsDark: state.settings.themeIsDark,
        typeIsFixedWing: state.settings.typeIsFixedWing
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setThemeState: () => dispatch(setThemeState()),
        setAircraftType: () => dispatch(setAircraftType()),
        setNotificationThreshold: event => dispatch(setNotificationThreshold(event.target.value))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);