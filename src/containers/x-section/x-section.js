// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
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

    componentDidMount() {
        this.intervalId = setInterval(() => this.setState({
            data: this.generateData()
        }), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        const themeClass = classNames(
            this.props.themeIsDark ? 'Dark' : 'Light'
        ), maxAltitude = this.props.typeIsFixedWing ? 35000 : 7000;
        let scale = this.generateScale(maxAltitude);
        return (
            <div className={'X-Section ' + themeClass}>
                {scale.map((item, i) => {
                    return (<hr key={i} data-content={item.altitude + 'ft'} style={{ top: item.position }} />)
                })}
                {this.state.data.map((item, i) => {
                    return (<img alt="" key={i} src={item.cloud} style={{
                        top: item.top,
                        left: item.left
                    }} />)
                })}
            </div>
        )
    }

    generateScale(maxAltitude) {
        return [
            {
                position: '0%',
                altitude: maxAltitude.toString()
            },
            {
                position: '25%',
                altitude: (maxAltitude * 0.75).toString()
            }, {
                position: '50%',
                altitude: (maxAltitude * 0.5).toString()
            }, {
                position: '75%',
                altitude: (maxAltitude * 0.25).toString()
            }, {
                position: '87.5%',
                altitude: (maxAltitude * 0.125).toString()
            }];
    }

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

const mapStateToProps = state => {
    return {
        typeIsFixedWing: state.settings.typeIsFixedWing,
        themeIsDark: state.settings.themeIsDark
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(XSection);