// @flow
import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {locationsAPIRequest, locationSelected} from '../../actions/location.actions';
import {filterLocations} from '../../services/locations.service';
import {generateRandomHexCode} from '../../services/utils.service';
import './search.css';
import Loading from '../loading/loading';
import List from '../core/list/list';

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
                        <List data={this.populateSearchList(this.state.filteredLocations)}
                              onClick={this.props.selectLocation}/>
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

    populateSearchList = (filteredLocations) => {
        let searchList = [], searchElement;
        for (const item of filteredLocations) {
            searchElement = {
                key: item.name,
                value: item.unitaryAuthArea,
                icon: true,
                data: item
            };
            searchList.push(searchElement);
        }
        return searchList;
    }
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
            let selectedLocation = location.data,
                storedLocation = localStorage.getItem('storedLocation');
            if (storedLocation && JSON.parse(storedLocation)) {
                // Clear the previously selected location from local storage
                localStorage.removeItem('storedLocation');
            }
            localStorage.setItem('storedLocation', JSON.stringify(selectedLocation));
            dispatch(locationSelected(selectedLocation));
        }
    };
};

Search.propTypes = {
    value: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
