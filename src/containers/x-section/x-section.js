// @flow
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {DateTime} from 'luxon';
import {getLunarPhase} from '../../services/utils.service';
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
            ), maxAltitude = this.props.typeIsFixedWing ? 35000 : 7000,
            lunarPhase = getLunarPhase(DateTime.utc().toJSDate());
        let scale = this.generateScale(maxAltitude);
        return (
            <Fragment>
                <div className={'X-Section ' + themeClass}>
                    {scale.map((item, i) => {
                        return (<hr key={i} data-content={item.altitude + 'ft'} style={{top: item.position}}/>)
                    })}
                    {this.state.data.map((item, i) => {
                        return (<img alt="" className="Cloud" key={i} src={item.cloud}
                                     style={this.calculatePosition(maxAltitude, item.attributes)}
                                     onMouseOver={this.onCloudMouseOver}
                                     data-properties={JSON.stringify(item.attributes)}/>)
                    })}
                </div>
                <div className={'Location-Bar ' + themeClass}>
                    <img alt="Moon phase" className="Lunar-Phase"
                         src={process.env.PUBLIC_URL + '/assets/lunar-phase/' + lunarPhase['img'] + '.svg'}
                         title={lunarPhase['phase'] + ', ' + lunarPhase['luminosity'] + '% luminosity'}/>
                    <div className="Locality">
                        <h5>{this.props.selectedLocation.name}</h5>
                        <p>13.00 - 15.00</p>
                    </div>
                </div>
            </Fragment>
        )
    }

    onCloudMouseOver = (event) => {
        console.table(JSON.parse(event.target.getAttribute('data-properties')));
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
        selectedLocation: state.locationsReducer.selectedLocation,
        typeIsFixedWing: state.settings.typeIsFixedWing,
        themeIsDark: state.settings.themeIsDark
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(XSection);