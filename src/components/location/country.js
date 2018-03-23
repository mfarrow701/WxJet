// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Country extends Component {

    render() {
        const {value} = this.props;
        return (
            <p className="Country">{value}</p>
        )
    }
}

Country.propTypes = {
    value: PropTypes.string,
};

export default Country;
