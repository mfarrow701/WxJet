// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
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

const cloudTypes = ['cirrus', 'cirrocumulus', 'cirrostratus', 'altocumulus', 'altostratus', 'stratocumulus', 'cumulus', 'cumulonimbus', 'nimbostratus', 'stratus'];

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
        }), 10000);
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
                {/*<svg width="100%" height="100%" viewBox="0 0 100 100">*/}
                    {/*<path*/}
                        {/*d="M0 14.3s6-6.4 13.8-2.5 13.9 5.7 20.7 4 8.3-3.2 13.3-2.3c5.1.9 10.3 9.6 10.3 9.6S68.6 38 79.5 34.5s8.1-11.8 11.2-16S100 14 100 14"*/}
                        {/*fill="none" stroke="white" strokeWidth="0.2"/>*/}
                {/*</svg>*/}
                {scale.map((item, i) => {
                    return (<hr key={i} data-content={item.altitude + 'ft'} style={{top: item.position}}/>)
                })}
                {this.state.data.map((item, i) => {
                    return (<img alt="" key={i} src={item.cloud}
                                 style={this.calculatePosition(maxAltitude, item.attributes)}
                                 onMouseOver={this.onCloudMouseOver}
                                 data-properties={JSON.stringify(item.attributes)}/>)
                })}
            </div>
        )
    }

    onCloudMouseOver = (event) => {
        let cloudProperties = JSON.parse(event.target.getAttribute('data-properties'));
        console.table(cloudProperties);
    };

    calculatePosition(maxAltitude, attributes) {
        return {
            top: (100 - ((attributes.altitude / maxAltitude) * 100)).toString() + '%',
            left: Math.floor(Math.random() * 101).toString() + '%'
        }
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
                left: Math.floor(Math.random() * 101).toString() + '%',
                attributes: {
                    altitude: Math.floor(Math.random() * 35000),
                    type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]
                }
            },
            {
                cloud: Cloud2,
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%',
                attributes: {
                    altitude: Math.floor(Math.random() * 35000),
                    type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]
                }
            },
            {
                cloud: Cloud3,
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%',
                attributes: {
                    altitude: Math.floor(Math.random() * 35000),
                    type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]
                }
            },
            {
                cloud: Cloud4,
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%',
                attributes: {
                    altitude: Math.floor(Math.random() * 35000),
                    type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]
                }
            },
            {
                cloud: Cloud5,
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%',
                attributes: {
                    altitude: Math.floor(Math.random() * 35000),
                    type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]
                }
            },
            {
                cloud: Cloud6,
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%',
                attributes: {
                    altitude: Math.floor(Math.random() * 35000),
                    type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]
                }
            },
            {
                cloud: Cloud7,
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%',
                attributes: {
                    altitude: Math.floor(Math.random() * 35000),
                    type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]
                }
            },
            {
                cloud: Cloud8,
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%',
                attributes: {
                    altitude: Math.floor(Math.random() * 35000),
                    type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]
                }
            },
            {
                cloud: Cloud9,
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%',
                attributes: {
                    altitude: Math.floor(Math.random() * 35000),
                    type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]
                }
            },
            {
                cloud: Cloud1,
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%',
                attributes: {
                    altitude: Math.floor(Math.random() * 35000),
                    type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]
                }
            },
            {
                cloud: Cloud2,
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%',
                attributes: {
                    altitude: Math.floor(Math.random() * 35000),
                    type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]
                }
            },
            {
                cloud: Cloud3,
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%',
                attributes: {
                    altitude: Math.floor(Math.random() * 35000),
                    type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]
                }
            },
            {
                cloud: Cloud4,
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%',
                attributes: {
                    altitude: Math.floor(Math.random() * 35000),
                    type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]
                }
            },
            {
                cloud: Cloud5,
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%',
                attributes: {
                    altitude: Math.floor(Math.random() * 35000),
                    type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]
                }
            },
            {
                cloud: Cloud6,
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%',
                attributes: {
                    altitude: Math.floor(Math.random() * 35000),
                    type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]
                }
            },
            {
                cloud: Cloud7,
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%',
                attributes: {
                    altitude: Math.floor(Math.random() * 35000),
                    type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]
                }
            },
            {
                cloud: Cloud8,
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%',
                attributes: {
                    altitude: Math.floor(Math.random() * 35000),
                    type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]
                }
            },
            {
                cloud: Cloud9,
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%',
                attributes: {
                    altitude: Math.floor(Math.random() * 35000),
                    type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]
                }
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