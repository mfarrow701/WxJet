// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './select-input.css';

class SelectInput extends Component {

    render() {
        const {iterator, name, onChange, required} = this.props;
        return (
            <select className="Select-Input"
                    name={name}
                    onChange={onChange}
                    required={required}>
                {iterator.map((element, index) => {
                    return <option key={index} value={element.value}>{element.option}</option>
                })}
            </select>
        )
    }
}

SelectInput.propTypes = {
    iterator: PropTypes.arrayOf(PropTypes.shape({
        option: PropTypes.string,
        value: PropTypes.number
    })).isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool
};

export default SelectInput;