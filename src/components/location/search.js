// @flow
import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {locationsAPIRequest, locationSelected} from '../../actions/location.actions';
import {filterLocations} from '../../services/locations.service';
import './search.css';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSearch: '',
            filteredLocations: null
        }
    }

    componentWillMount() {
        this.props.requestLocations();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.locationsPayload !== null) {
            this.setState({
                filteredLocations: filterLocations(nextProps.locationsPayload.Locations.Location, '', 100)
            });
        }
    }

    render() {
        let body;
        if (this.state.filteredLocations === null) {
            body = <h1>Loading search...</h1>
        } else {
            body = (
                <Fragment>
                    <input onChange={this.handleSearchChange} placeholder="Search for a location..." type="search"/>
                    {this.state.filteredLocations.map(locationData => {
                        return (
                            <p key={locationData.id}
                               onClick={() => this.props.selectLocation(locationData)}>{locationData.name}</p>
                        )
                    })}
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
            filteredLocations: filterLocations(this.props.locationsPayload.Locations.Location, event.target.value, 100)
        });
    };

}

const mapStateToProps = state => {
    return {
        locationsFetching: state.locationsReducer.fetching,
        locationsPayload: state.locationsReducer.payload,
        locationsError: state.locationsReducer.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        requestLocations: () => dispatch(locationsAPIRequest()),
        selectLocation: location => dispatch(locationSelected(location))
    };
};

Search.propTypes = {
    value: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
