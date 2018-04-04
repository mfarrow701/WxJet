// @flow
import React, {Component} from 'react';
import './loading.css';

class Loading extends Component {

    render() {
        return (
            <div className="Loading">
                <span className="Progress"></span>
            </div>
        )
    }
}

export default Loading;
