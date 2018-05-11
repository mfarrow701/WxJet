// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './profile.css';

class Profile extends Component {
    name = 'Matthew Farrow';

    render() {
        return (
            <div className="Profile">
                <div className="Avatar">
                    <img src={'https://github.com/identicons/' + this.name.replace(' ', '').toUpperCase() + '.png'} alt="Avatar" title="Avatar"/>
                    <h3>Matthew Farrow</h3>
                    <p>Web & hybrid app developer</p>
                </div>
                <div className="Details">
                    <p className="Favourite-Location"><strong>Home location:</strong> {this.props.selectedLocation.name}
                    </p>
                    <p><strong>My aircraft:</strong> {this.props.typeIsFixedWing ? 'Fixed' : 'Rotary'} wing</p>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        selectedLocation: state.locationsReducer.selectedLocation,
        typeIsFixedWing: state.settings.typeIsFixedWing
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);