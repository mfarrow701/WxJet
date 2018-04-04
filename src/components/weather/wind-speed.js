// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {isNullOrUndefined} from '../../services/utils.service';

class WindSpeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isKnots: true
        }
    }

    render() {
        const {value} = this.props;
        return (
            <h3 className="Wind-Speed"
                onClick={this.onClick}>{this.convertValue(value)}</h3>
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
            return this.state.isKnots ? value.toFixed(0).toString() + 'kts' : (value * 0.51444).toFixed(0).toString() + 'm/s';
        }
    }

    /**
     * The click handler for the temperature component
     */
    onClick = () => {
        this.setState({
            isKnots: !this.state.isKnots
        });
    };
}

WindSpeed.propTypes = {
    value: PropTypes.number
};

export default WindSpeed;
