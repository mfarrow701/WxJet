// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './number-input.css';

class NumberInput extends Component {

    render() {
        const {maxValue, minValue, name, onChange, placeholder, required, value} = this.props;
        return (
            <input className="Number-Input"
                   max={maxValue}
                   min={minValue}
                   name={name}
                   onChange={onChange}
                   placeholder={placeholder}
                   required={required}
                   type="number"
                   value={value}/>
        )
    }
}

NumberInput.propTypes = {
    maxValue: PropTypes.string,
    minValue: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    value: PropTypes.string.isRequired
};

export default NumberInput;