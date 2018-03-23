// @flow
import React, {Component} from 'react';

class FlightRule extends Component {
    constructor() {
        super();
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
        const flightRule = this.state.isVFR ? 'VFR' : 'IFR';
        return (
            <h3 className="Flight-Rule">{flightRule}</h3>
        )
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
}

FlightRule.propTypes = {
};

export default FlightRule;
