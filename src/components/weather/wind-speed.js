// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {isNullOrUndefined} from '../../services/utils.service';
import './wind-speed.css';

class WindSpeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMps: true
        }
    }

    render() {
        return (
            <h1 className="Wind-Speed"
                onClick={this.onClick}>{this.convertValue(this.props.value)}</h1>
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
            return '--kts'
        } else {
            return this.state.isMps ? value.toFixed(0).toString() + 'm/s' : (value * 1.94).toFixed(0).toString() + 'kts';
        }
    }

    /**
     * The click handler for the temperature component
     */
    onClick = () => {
        this.setState({
            isMps: !this.state.isMps
        });
    };
}

WindSpeed.propTypes = {
    value: PropTypes.number
};

export default WindSpeed;
