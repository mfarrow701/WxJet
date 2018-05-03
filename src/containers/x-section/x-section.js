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
    constructor() {
        super();
        this.state = {
            data: this.generateData()
        }
    }

    componentWillMount() {
        setInterval(() => this.setState({
            data: this.generateData()
        }), 5000);
    }

    render() {
        return (
            <div className="X-Section">
                {this.state.data.map((item, i) => {
                    return (<img alt="" key={i} src={item.cloud} style={{
                        top: item.top,
                        left: item.left
                    }} onMouseOver={this.onMouseOver} data-tag={{key: 'value'}}/> )
                })}
            </div>
        )
    }

    onMouseOver = (event) => {
        console.log("Mousing over!");
        console.log(event.target.getAttribute('data-tag'));
    };

    generateData() {
        return [
            {
                cloud: Cloud1,
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%'
            },
            {
                cloud: Cloud2,
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%'
            },
            {
                cloud: Cloud3,
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%'
            },
            {
                cloud: Cloud4,
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%'
            },
            {
                cloud: Cloud5,
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%'
            },
            {
                cloud: Cloud6,
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%'
            },
            {
                cloud: Cloud7,
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%'
            },
            {
                cloud: Cloud8,
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%'
            },
            {
                cloud: Cloud9,
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%'
            },
            {
                cloud: Cloud1,
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%'
            },
            {
                cloud: Cloud2,
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%'
            },
            {
                cloud: Cloud3,
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%'
            },
            {
                cloud: Cloud4,
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%'
            },
            {
                cloud: Cloud5,
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%'
            },
            {
                cloud: Cloud6,
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%'
            },
            {
                cloud: Cloud7,
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%'
            },
            {
                cloud: Cloud8,
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%'
            },
            {
                cloud: Cloud9,
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%'
            }
        ]
    }
}

export default XSection;