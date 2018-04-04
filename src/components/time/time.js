// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {isNullOrUndefined} from '../../services/utils.service';
import {DateTime} from 'luxon';

class Time extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: this.getTime()
        }
    }

    componentWillMount() {
        this.interval = setInterval(() => this.setState({
            time: this.getTime()
        }), 1000);
    }

    render() {
        return (
            <h1 className="Time">{this.state.time}</h1>
        )
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getTime() {
        const {format} = this.props;
        return isNullOrUndefined(format) ? DateTime.local().toLocaleString(DateTime.TIME_24_SIMPLE) : DateTime.local().toLocaleString(format);
    }
}

Time.propTypes = {
    format: PropTypes.object
};

export default Time;
