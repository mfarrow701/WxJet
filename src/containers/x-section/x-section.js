// @flow
import React, {Component} from 'react';
import Cloud1 from './assets/cloud1.svg';
import Cloud2 from './assets/cloud2.svg';
import Cloud3 from './assets/cloud3.svg';
import Cloud4 from './assets/cloud4.svg';
import Cloud5 from './assets/cloud5.svg';
import Cloud6 from './assets/cloud6.svg';
import Cloud7 from './assets/cloud7.svg';
import Cloud8 from './assets/cloud8.svg';
import Cloud9 from './assets/cloud9.svg';
import './x-section.css';

class XSection extends Component {

    render() {
        return (
            <div className="X-Section">
                <img src={Cloud1} style={{top: Math.floor(Math.random() * 101).toString() + '%', left: Math.floor(Math.random() * 101).toString() + '%'}} />
                <img src={Cloud2} style={{top: Math.floor(Math.random() * 101).toString() + '%', left: Math.floor(Math.random() * 101).toString() + '%'}}/>
                <img src={Cloud3} style={{top: Math.floor(Math.random() * 101).toString() + '%', left: Math.floor(Math.random() * 101).toString() + '%'}}/>
                <img src={Cloud4} style={{top: Math.floor(Math.random() * 101).toString() + '%', left: Math.floor(Math.random() * 101).toString() + '%'}}/>
                <img src={Cloud5} style={{top: Math.floor(Math.random() * 101).toString() + '%', left: Math.floor(Math.random() * 101).toString() + '%'}}/>
                <img src={Cloud6} style={{top: Math.floor(Math.random() * 101).toString() + '%', left: Math.floor(Math.random() * 101).toString() + '%'}}/>
                <img src={Cloud7} style={{top: Math.floor(Math.random() * 101).toString() + '%', left: Math.floor(Math.random() * 101).toString() + '%'}}/>
                <img src={Cloud8} style={{top: Math.floor(Math.random() * 101).toString() + '%', left: Math.floor(Math.random() * 101).toString() + '%'}}/>
                <img src={Cloud9} style={{top: Math.floor(Math.random() * 101).toString() + '%', left: Math.floor(Math.random() * 101).toString() + '%'}}/>
                <img src={Cloud1} style={{top: Math.floor(Math.random() * 101).toString() + '%', left: Math.floor(Math.random() * 101).toString() + '%'}} />
                <img src={Cloud2} style={{top: Math.floor(Math.random() * 101).toString() + '%', left: Math.floor(Math.random() * 101).toString() + '%'}}/>
                <img src={Cloud3} style={{top: Math.floor(Math.random() * 101).toString() + '%', left: Math.floor(Math.random() * 101).toString() + '%'}}/>
                <img src={Cloud4} style={{top: Math.floor(Math.random() * 101).toString() + '%', left: Math.floor(Math.random() * 101).toString() + '%'}}/>
                <img src={Cloud5} style={{top: Math.floor(Math.random() * 101).toString() + '%', left: Math.floor(Math.random() * 101).toString() + '%'}}/>
                <img src={Cloud6} style={{top: Math.floor(Math.random() * 101).toString() + '%', left: Math.floor(Math.random() * 101).toString() + '%'}}/>
                <img src={Cloud7} style={{top: Math.floor(Math.random() * 101).toString() + '%', left: Math.floor(Math.random() * 101).toString() + '%'}}/>
                <img src={Cloud8} style={{top: Math.floor(Math.random() * 101).toString() + '%', left: Math.floor(Math.random() * 101).toString() + '%'}}/>
                <img src={Cloud9} style={{top: Math.floor(Math.random() * 101).toString() + '%', left: Math.floor(Math.random() * 101).toString() + '%'}}/>
            </div>
        )
    }
}

export default XSection;