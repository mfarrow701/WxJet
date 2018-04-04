// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './error.css';

class Error extends Component {

    render() {
        return (
            <div className="Error">
                <h1>{this.props.message || 'No message specified'}</h1>
            </div>
        )
    }
}

Error.propTypes = {
    message: PropTypes.string
};

export default Error;