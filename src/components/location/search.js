// @flow
import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {locationsAPIRequest, locationSelected} from '../../actions/location.actions';
import {filterLocations} from '../../services/locations.service';
import './search.css';
import Loading from '../loading/loading';
import List from '../core/list/list';
import SearchInput from '../core/input/search-input';
import Locations from './static/locations.json';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredLocations: filterLocations(Locations.locations, '', 15)
        }
    }

    render() {
        let body;
        if (this.state.filteredLocations === null) {
            body = <Loading />
        } else if (this.state.filteredLocations.length === 0) {
            body = (
                <Fragment>
                    <SearchInput name="locationSearch" onChange={this.handleSearchChange}
                                 placeholder='Search for a location...'/>
                    <h5>No matching locations</h5>
                </Fragment>
            )
        } else {
            body = (
                <Fragment>
                    <SearchInput name="locationSearch" onChange={this.handleSearchChange}
                                 placeholder='Search for a location...'/>
                    <List data={this.populateSearchList(this.state.filteredLocations)}
                          onClick={this.props.selectLocation}/>
                </Fragment>
            );
        }
        return (
            <div className="Search">
                {body}
            </div>
        )
    }

    handleSearchChange = (event) => {
        this.setState({
            filteredLocations: filterLocations(Locations.locations, event.target.value, 15)
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
        selectLocation: location => dispatch(locationSelected(location.data))
    };
};

Search.propTypes = {
    value: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
