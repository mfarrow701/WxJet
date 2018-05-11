// @flow
import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {isNullOrUndefined} from '../../services/utils.service';
import './pressure.css';

class Pressure extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isQNH: true
        }
    }

    render() {
        return (
            <h3 className="Pressure"
                onClick={this.onClick}>{this.convertValue(this.props.value, this.props.altitude)}</h3>
        )
    }

    convertValue(value, altitude) {
        const diff = Math.round(altitude / 30);
        if (isNullOrUndefined(value)) {
            return this.state.isQNH ? 'QNH --' : 'QFE --'
        } else {
            return this.state.isQNH ? 'QNH ' + value.toString() : 'QFE ' + (value - diff).toString();
        }
    }

    onClick = () => {
        this.setState({
            isQNH: !this.state.isQNH
        });
    };
}

Pressure.propTypes = {
    value: PropTypes.number,
    altitude: PropTypes.number
};

export default Pressure;
