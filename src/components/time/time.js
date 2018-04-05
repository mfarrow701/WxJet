// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {isNullOrUndefined} from '../../services/utils.service';
import {DateTime} from 'luxon';

class Time extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: DateTime.local()
        }
    }

    componentWillMount() {
        this.interval = setInterval(() => this.setState({
            time: DateTime.local()
        }), 1000);
    }

    render() {
        const time = isNullOrUndefined(this.props.format) ? this.state.time.toLocaleString(DateTime.TIME_24_SIMPLE) : this.state.time.toLocaleString(this.props.format);
        return (
            <h1 className="Time">{time}</h1>
        )
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
}

Time.propTypes = {
    format: PropTypes.object
};

export default Time;
