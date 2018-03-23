// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class City extends Component {

    render() {
        const {value} = this.props;
        return (
            <h3 className="City">{value}</h3>
        )
    }
}

City.propTypes = {
    value: PropTypes.string,
};

export default City;
