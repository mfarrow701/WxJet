// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './switch.css';

class Switch extends Component {

    render() {
        return (
            <label className="Switch">
                <input type="checkbox" checked={this.props.checked} onChange={this.props.handleChange}/>
                <span className="Slider"/>
            </label>
        )
    }
}

Switch.propTypes = {
    checked: PropTypes.bool,
    handleChange: PropTypes.func,
};

export default Switch;
