// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class City extends Component {

    render() {
        return (
            <h3 className="City">{this.props.value || 'No city specified'}</h3>
        )
    }
}

City.propTypes = {
    value: PropTypes.string,
};

export default City;
