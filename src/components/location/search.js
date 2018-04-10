// @flow
import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {locationsAPIRequest, locationSelected} from '../../actions/location.actions';
import {filterLocations} from '../../services/locations.service';
import {generateRandomHexCode} from '../../services/utils.service';
import './search.css';
import Loading from '../loading/loading';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredLocations: null,
        }
    }

    componentWillMount() {
        this.props.requestLocations();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.locationsPayload !== null) {
            this.setState({
                filteredLocations: filterLocations(nextProps.locationsPayload.locations, '', 15)
            });
        }
    }

    render() {
        let body;
        if (!this.props.locationsError) {
            if (this.state.filteredLocations === null) {
                body = <Loading />
            } else if (this.state.filteredLocations.length === 0) {
                body = (
                    <Fragment>
                        <input onChange={this.handleSearchChange} placeholder="Search for a location..." type="search"/>
                        <h5>No matching locations</h5>
                    </Fragment>
                )
            } else {
                body = (
                    <Fragment>
                        <input onChange={this.handleSearchChange} placeholder="Search for a location..." type="search"/>
                        {this.state.filteredLocations.map(locationData => {
                            return (
                                <div className="Item" key={locationData.id}
                                     onClick={() => this.props.selectLocation(locationData)}>
                                    <div className="Icon" style={{background: generateRandomHexCode()}}/>
                                    <div className="Content">
                                        <h5>{locationData.name}</h5>
                                        <p>{locationData.unitaryAuthArea}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </Fragment>
                );
            }
        } else {
            body = (
                <Fragment>
                    <h5>Error with the locations API</h5>
                    <button onClick={() => this.props.requestLocations()}>Request locations</button>
                </Fragment>
            )
        }
        return (
            <div className="Search">
                {body}
            </div>
        )
    }

    handleSearchChange = (event) => {
        this.setState({
            filteredLocations: filterLocations(this.props.locationsPayload.locations, event.target.value, 15)
        });
    };
}

const mapStateToProps = state => {
    return {
        locationsPayload: state.locationsReducer.payload,
        locationsError: state.locationsReducer.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        requestLocations: () => dispatch(locationsAPIRequest()),
        selectLocation: location => {
            let storedLocation = localStorage.getItem('storedLocation');
            if (storedLocation && JSON.parse(storedLocation)) {
                // Clear the previously selected location from local storage
                localStorage.removeItem('storedLocation');
            }
            localStorage.setItem('storedLocation', JSON.stringify(location));
            dispatch(locationSelected(location));
        }
    };
};

Search.propTypes = {
    value: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
