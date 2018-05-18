// @flow
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {DateTime} from 'luxon';
import {
    calculatePercentagePosition,
    cloudTypes,
    generateXSectionScale,
    generateXSectionWeather,
    getLunarPhase,
} from '../../services/x-section-service';
import NumberInput from '../../components/core/input/number-input';
import Button from '../../components/core/button/button';
import SelectInput from '../../components/core/input/select-input';
import './x-section.css';

class XSection extends Component {
    constructor() {
        super();
        this.state = {
            data: generateXSectionWeather(),
            selectedElement: null,
            updateForm: {
                type: '1',
                altitude: ''
            }
        }
    }

    componentDidMount() {
        this.intervalId = setInterval(() => this.setState({
            data: generateXSectionWeather()
        }), 60000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        const themeClass = classNames(
            this.props.themeIsDark ? 'Dark' : 'Light'
            ), maxAltitude = this.props.typeIsFixedWing ? 35000 : 7000,
            lunarPhase = getLunarPhase(DateTime.utc().toJSDate());
        let scale = generateXSectionScale(maxAltitude);
        return (
            <Fragment>
                <div className={'X-Section ' + themeClass}>
                    {scale.map((item, i) => {
                        return (<hr key={i} data-content={item.altitude + 'ft'} style={{top: item.position}}/>)
                    })}
                    {this.state.data.map((item, i) => {
                        return (<img alt="" className="Cloud" key={i}
                                     onClick={() => this.setState({selectedElement: item})}
                                     src={require('./assets/cloud-types/cloud' + item.cloud + '.svg')}
                                     style={calculatePercentagePosition(maxAltitude, item)}
                                     data-properties={JSON.stringify(item.attributes)}
                                     title={item.attributes.type + ' at ' + item.attributes.altitude + 'ft'}/>)
                    })}
                </div>

                <div className='X-Section-Details'
                     style={{'left': this.state.selectedElement !== null ? '0' : '-400px'}}>
                    <div className={'Cloud-Type-Bar ' + themeClass}
                         onClick={() => this.setState({
                             selectedElement: null,
                             updateForm: {
                                 type: '1',
                                 altitude: ''
                             }
                         })} title="Close panel">
                        <h5>{ this.state.selectedElement !== null ? this.state.selectedElement.attributes.type + ' at ' +
                            this.state.selectedElement.attributes.altitude + 'ft' : ''}</h5>
                    </div>
                    <form className="Content" onSubmit={this.onFormSubmit}>
                        <h5>Cloud Type</h5>
                        <SelectInput iterator={cloudTypes} name="type" onChange={this.onInput} required={true}/>
                        <h5>Cloud Altitude</h5>
                        <NumberInput maxValue={maxAltitude.toString()}
                                     minValue={'1'}
                                     name="altitude"
                                     onChange={this.onInput}
                                     placeholder={'Enter a value between 1 & ' + maxAltitude + 'ft'}
                                     required={true}
                                     value={this.state.updateForm.altitude}/>
                        <Button placeholder="Update cloud" type="submit"/>
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
                type: '1',
                altitude: ''
            }
        });
    };
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