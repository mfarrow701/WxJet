// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class FlightRule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVFR: true
        }
    }

    componentWillMount() {
        this.interval = setInterval(() => this.setState({
            isVFR: !this.state.isVFR
        }), 5000)
    }

    render() {
        const flightRule = this.calculateFlightRule(this.props.ceiling, this.props.visibility);
        return (
            <h3 className="Flight-Rule" style={{color: flightRule.colour}}>{flightRule.state}</h3>
        )
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    calculateFlightRule(ceiling, visibility) {
        let flightRule = {
            state: 'VFR',
            colour: '#289500'
        }, forwardVis = visibility / 1000;
        if (ceiling < 500 || forwardVis < 1) {
            flightRule = {
                state: 'LIFR',
                colour: '#6b49c8'
            };
        } else if ((ceiling >= 500 && ceiling < 1000) || (forwardVis >= 1 && forwardVis < 3)) {
            flightRule = {
                state: 'IFR',
                colour: '#d81700'
            };
        } else if ((ceiling >= 1000 && ceiling < 3000) || (forwardVis >= 3 && forwardVis < 5)) {
            flightRule = {
                state: 'MVFR',
                colour: '#f7e401'
            };
        }
        return flightRule;
    }
}

FlightRule.propTypes = {
    ceiling: PropTypes.number,
    visibility: PropTypes.number
};

export default FlightRule;
