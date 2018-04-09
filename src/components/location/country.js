// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Country extends Component {

    render() {
        return (
            <p className="Country">{this.props.value || 'No country specified'}</p>
        )
    }
}

Country.propTypes = {
    value: PropTypes.string,
};

export default Country;
