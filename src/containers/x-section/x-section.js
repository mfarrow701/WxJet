// @flow
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {DateTime} from 'luxon';
import {getLunarPhase} from '../../services/utils.service';
import './x-section.css';

const cloudTypes = ['Cirrus', 'Cirrocumulus', 'Cirrostratus', 'Altocumulus', 'Altostratus', 'Stratocumulus', 'Cumulus', 'Cumulonimbus', 'Nimbostratus', 'Stratus'];

class XSection extends Component {
    constructor() {
        super();
        this.state = {
            data: this.generateData(),
            selectedElement: null,
            updateForm: {
                type: '',
                altitude: ''
            }
        }
    }

    componentDidMount() {
        // this.intervalId = setInterval(() => this.setState({
        //     data: this.generateData()
        // }), 20000);
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
                        return (<img alt="" className="Cloud" key={i}
                                     onClick={() => this.onClick(item, i)}
                                     src={require('./assets/cloud-types/cloud' + item.cloud + '.svg')}
                                     style={this.calculatePosition(maxAltitude, item)}
                                     data-properties={JSON.stringify(item.attributes)}
                                     title={item.attributes.type + ' at ' + item.attributes.altitude + 'ft'}/>)
                    })}
                </div>

                <div className='X-Section-Details'
                     style={{'left': this.state.selectedElement !== null ? '0' : '-500px'}}>
                    <div className={'Cloud-Type-Bar ' + themeClass}
                         onClick={() => this.setState({
                             selectedElement: null,
                             updateForm: {
                                 type: '',
                                 altitude: ''
                             }
                         })}>
                        <h5>{ this.state.selectedElement !== null ? this.state.selectedElement.attributes.type + ' at ' +
                            this.state.selectedElement.attributes.altitude + 'ft' : ''}</h5>
                    </div>
                    <form className="Content" onSubmit={this.onFormSubmit}>
                        <h5>Cloud Type</h5>
                        <input onChange={this.onInput} value={this.state.updateForm.type} name="type" type="number"
                               min="1" max="9"
                               placeholder='Enter a value between 1 & 9' required/>
                        <h5>Cloud Altitude</h5>
                        <input onChange={this.onInput} value={this.state.updateForm.altitude} name="altitude"
                               type="number" min="1000" max="35000"
                               placeholder='Enter a value between 1000 & 35000 ft' required/>
                        <button type="submit">Update cloud</button>
                    </form>
                </div>

                <div className={'Location-Bar ' + themeClass}>
                    <img alt="Moon phase" className="Lunar-Phase"
                         src={require('./assets/lunar-phase/' + lunarPhase['img'] + '.svg')}
                         title={lunarPhase['phase'] + ', ' + lunarPhase['luminosity'] + '% luminosity'}/>
                    <div className="Locality">
                        <h5>{this.props.selectedLocation.name}</h5>
                        <p>{DateTime.utc().toLocaleString(DateTime.TIME_24_SIMPLE) + ' - ' + DateTime.utc().plus({hours: 3}).toLocaleString(DateTime.TIME_24_SIMPLE)}</p>
                    </div>
                </div>
            </Fragment>
        )
    }

    onClick = (item, index) => {
        this.setState({
            selectedElement: item
        })
    };


    onInput = (event) => {
        const fieldName = event.target.name, fieldValue = event.target.value;
        this.setState({
            updateForm: {
                ...this.state.updateForm,
                [fieldName]: fieldValue
            }
        });
    };

    onFormSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        let stateCopy = Object.assign({}, this.state), modifiedState;
        modifiedState = stateCopy.data.filter((elem, index) => {
            if (elem.id === this.state.selectedElement.id) {
                let percentageAltidue, altitude = this.state.updateForm.altitude;
                percentageAltidue = (100 - ((altitude / 35000) * 100)).toString() + '%';
                stateCopy.data[index].cloud = this.state.updateForm.type;
                stateCopy.data[index].top = percentageAltidue;
                stateCopy.data[index].attributes.altitude = altitude;
            }
            return stateCopy.data;
        });
        this.setState({
            data: modifiedState,
            selectedElement: null,
            updateForm: {
                type: '',
                altitude: ''
            }
        });
    };

    calculatePosition(maxAltitude, element) {
        return {
            top: (100 - ((element.attributes.altitude / maxAltitude) * 100)).toString() + '%',
            left: element.left
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
                id: '1',
                cloud: '1',
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%',
                attributes: {
                    altitude: Math.floor(Math.random() * 35000),
                    type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]
                }
            },
            {
                id: '2',
                cloud: '2',
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%',
                attributes: {
                    altitude: Math.floor(Math.random() * 35000),
                    type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]
                }
            },
            {
                id: '3',
                cloud: '3',
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%',
                attributes: {
                    altitude: Math.floor(Math.random() * 35000),
                    type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]
                }
            },
            {
                id: '4',
                cloud: '4',
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%',
                attributes: {
                    altitude: Math.floor(Math.random() * 35000),
                    type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]
                }
            },
            {
                id: '5',
                cloud: '5',
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%',
                attributes: {
                    altitude: Math.floor(Math.random() * 35000),
                    type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]
                }
            },
            {
                id: '6',
                cloud: '6',
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%',
                attributes: {
                    altitude: Math.floor(Math.random() * 35000),
                    type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]
                }
            },
            {
                id: '7',
                cloud: '7',
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%',
                attributes: {
                    altitude: Math.floor(Math.random() * 35000),
                    type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]
                }
            },
            {
                id: '8',
                cloud: '8',
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%',
                attributes: {
                    altitude: Math.floor(Math.random() * 35000),
                    type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]
                }
            },
            {
                id: '9',
                cloud: '9',
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%',
                attributes: {
                    altitude: Math.floor(Math.random() * 35000),
                    type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]
                }
            },
            {
                id: '10',
                cloud: '1',
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%',
                attributes: {
                    altitude: Math.floor(Math.random() * 35000),
                    type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]
                }
            },
            {
                id: '111',
                cloud: '2',
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%',
                attributes: {
                    altitude: Math.floor(Math.random() * 35000),
                    type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]
                }
            },
            {
                id: '12',
                cloud: '3',
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%',
                attributes: {
                    altitude: Math.floor(Math.random() * 35000),
                    type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]
                }
            },
            {
                id: '13',
                cloud: '4',
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%',
                attributes: {
                    altitude: Math.floor(Math.random() * 35000),
                    type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]
                }
            },
            {
                id: '14',
                cloud: '5',
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%',
                attributes: {
                    altitude: Math.floor(Math.random() * 35000),
                    type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]
                }
            },
            {
                id: '15',
                cloud: '6',
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%',
                attributes: {
                    altitude: Math.floor(Math.random() * 35000),
                    type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]
                }
            },
            {
                id: '16',
                cloud: '7',
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%',
                attributes: {
                    altitude: Math.floor(Math.random() * 35000),
                    type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]
                }
            },
            {
                id: '17',
                cloud: '8',
                top: Math.floor(Math.random() * 101).toString() + '%',
                left: Math.floor(Math.random() * 101).toString() + '%',
                attributes: {
                    altitude: Math.floor(Math.random() * 35000),
                    type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]
                }
            },
            {
                id: '18',
                cloud: '9',
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