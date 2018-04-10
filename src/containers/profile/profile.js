// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './profile.css';

class Profile extends Component {

    render() {
        return (
            <div className="Profile">
                <div className="Avatar">
                    <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" title="Avatar" />
                    <h3>Matthew Farrow</h3>
                    <p><em>Web Application Developer</em></p>
                </div>
                <div className="Details">
                    <p className="Email"><strong>Email:</strong> N/A</p>
                    <p className="Favourite-Location"><strong>Home location:</strong> {this.props.selectedLocation.name}</p>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);