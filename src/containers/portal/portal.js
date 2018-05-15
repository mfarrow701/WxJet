// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './portal.css';

class Portal extends Component {

    render() {
        return (
            <div className="Portal">
                <footer>
                    <button onClick={this.props.navigateToApp}>Launch App</button>
                </footer>
            </div>
        )
    }
}

Portal.propTypes = {
    navigateToApp: PropTypes.func,
};

export default Portal;