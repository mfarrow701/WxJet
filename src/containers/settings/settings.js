// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    setCloudThreshold,
    setVisibilityThreshold,
    setWindThreshold,
    setStormThreshold,
    setThemeState, setAircraftType
} from '../../actions/settings.actions';
import Switch from '../../components/switch/switch';
import './settings.css'
import NumberInput from '../../components/core/input/number-input';

class Settings extends Component {

    render() {
        return (
            <div className="Settings">
                <h1>Settings</h1>
                <p>Cloud threshold (ft)</p>
                <NumberInput name="cloudThreshold" onChange={this.props.setCloudThreshold}
                             value={this.props.cloudThreshold.toString() || '' }/>
                <p>Wind threshold (Kt)</p>
                <NumberInput name="windThreshold" onChange={this.props.setWindThreshold}
                             value={this.props.windThreshold.toString() || '' } minValue={0} maxValue={40}/>
                <p>Visibility threshold (m)</p>
                <NumberInput name="visibilityThreshold" onChange={this.props.setVisibilityThreshold}
                             value={this.props.visibilityThreshold.toString() || '' } minValue={100} maxValue={9999}/>
                <p>Storm threshold (nm)</p>
                <NumberInput name="stormThreshold" onChange={this.props.setStormThreshold}
                             value={this.props.stormThreshold.toString() || '' } minValue={1} maxValue={50}/>
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
        cloudThreshold: state.settings.cloudThreshold,
        visibilityThreshold: state.settings.visibilityThreshold,
        windThreshold: state.settings.windThreshold,
        stormThreshold: state.settings.stormThreshold,
        themeIsDark: state.settings.themeIsDark,
        typeIsFixedWing: state.settings.typeIsFixedWing
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setThemeState: () => dispatch(setThemeState()),
        setAircraftType: () => dispatch(setAircraftType()),
        setCloudThreshold: event => dispatch(setCloudThreshold(event.target.value)),
        setVisibilityThreshold: event => dispatch(setVisibilityThreshold(event.target.value)),
        setWindThreshold: event => dispatch(setWindThreshold(event.target.value)),
        setStormThreshold: event => dispatch(setStormThreshold(event.target.value))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);