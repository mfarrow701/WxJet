// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class WeatherIcon extends Component {

    render() {
        return (
            <img alt="Weather icon" className="Weather-Icon" src={this.props.icon}/>
        )
    }
}

WeatherIcon.propTypes = {
    icon: PropTypes.string
};

export default WeatherIcon;
