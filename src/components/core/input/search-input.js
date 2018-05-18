// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './search-input.css';

class SearchInput extends Component {

    render() {
        const {name, onChange, placeholder, value} = this.props;
        return (
            <input className="Search-Input"
                   name={name}
                   onChange={onChange}
                   placeholder={placeholder}
                   type="search"
                   value={value}/>
        )
    }
}

SearchInput.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string
};

export default SearchInput;