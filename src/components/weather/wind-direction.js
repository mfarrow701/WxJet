// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {isNullOrUndefined} from '../../services/utils.service';

class WindDirection extends Component {

    render() {
        const {value} = this.props;
        return (
            <h1 className="Wind-Direction">{this.convertValue(value) + '°'}</h1>
        )
    }

    convertValue(value) {
        if (isNullOrUndefined(value)) {
            return '--'
        } else {
            return value;
        }
    }
}

WindDirection.propTypes = {
    value: PropTypes.string
};

export default WindDirection;
