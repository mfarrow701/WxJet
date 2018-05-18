// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './button.css';

class Button extends Component {

    render() {
        const {onClick, placeholder, type} = this.props;
        return (
            <button className="Button"
                onClick={onClick}
                type={type}>{placeholder}</button>
        )
    }
}

Button.propTypes = {
    onClick: PropTypes.func,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string
};

export default Button;