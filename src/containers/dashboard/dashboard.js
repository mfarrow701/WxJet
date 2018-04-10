// @flow
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {DateTime} from 'luxon';
import loremImpsum from 'lorem-ipsum';
import Temperature from '../../components/weather/temperature';
import Time from '../../components/time/time';
import FlightRule from '../../components/weather/flight-rule';
import City from '../../components/location/city';
import Country from '../../components/location/country';
import WindDirection from '../../components/weather/wind-direction';
import WindSpeed from '../../components/weather/wind-speed';
import {generateRandomNumberBetweenValues} from '../../services/utils.service';
import './dashboard.css';

class Dashboard extends Component {

    render() {
        let body,
            updateMessage = 'United Kingdom, updated 7 min ago';
        body = (
            <Fragment>
                <div className="Location-Card">
                    <City value={this.props.selectedLocation.name}/>
                    <Country value={updateMessage}/>
                </div>
                <div className="Card Flight-Card">
                    <div className="Content">
                        <h5>Flight information</h5>
                        <Temperature value={generateRandomNumberBetweenValues(-4, 30)}/>
                        <Time format={DateTime.TIME_24_WITH_SECONDS}/>
                        <FlightRule ceiling={generateRandomNumberBetweenValues(0, 20000)}
                                    visibility={generateRandomNumberBetweenValues(0, 10000)}/>
                    </div>
                </div>
                <div className="Card Wind-Card">
                    <div className="Content">
                        <h5>Wind & pressure</h5>
                        <WindDirection value={generateRandomNumberBetweenValues(0, 360).toString()}/>
                        <WindSpeed value={generateRandomNumberBetweenValues(0, 25)}/>
                    </div>
                </div>

                <div className="Card Details-Card">
                    <div className="Content">
                        <h5>Details</h5>
                        <p>{loremImpsum({
                            count: 2,
                            units: 'paragraphs'
                        })}</p>
                    </div>
                </div>
            </Fragment>
        );
        return (
            <div className="Dashboard">
                {body}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedLocation: state.locationsReducer.selectedLocation
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);