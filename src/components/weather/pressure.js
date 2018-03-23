// @flow
import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

class Pressure extends Component {

    render() {
        return (
            <Fragment>
                <h1 className="Pressure-Type">QNH</h1>
                <h3 className="Pressure-Value">1024</h3>
            </Fragment>
        )
    }
}

Pressure.propTypes = {
    value: PropTypes.number
};

export default Pressure;
