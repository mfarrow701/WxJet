// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {isNullOrUndefined} from '../../services/utils.service';

class Temperature extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCelsius: true
        }
    }

    render() {
        const {value} = this.props;
        return (
            <h1 className="Temperature"
                onClick={this.onClick}>{this.convertValue(value)}</h1>
        )
    }

    /**
     * Converts a given value from degrees celsius to
     * fahrenheit
     * @param {number} value: The temperature value
     * @returns {string}: The corresponding text
     */
    convertValue(value) {
        if (isNullOrUndefined(value)) {
            return '--°C'
        } else {
            return this.state.isCelsius ? value.toString() + '°C' : (value * 9 / 5 + 32) + '°F';
        }
    }

    /**
     * The click handler for the temperature component
     */
    onClick = () => {
        this.setState({
            isCelsius: !this.state.isCelsius
        });
    };
}

Temperature.propTypes = {
    value: PropTypes.number
};

export default Temperature;
