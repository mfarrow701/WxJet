// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import './admin.css';
import Status from '../../components/weather/status';

const states = ['#CC0033', '#FF9900', '#a3d700', 'transparent'];

class Admin extends Component {
    constructor() {
        super();
        this.state = {
            isReversed: false,
            favourites: [
                {
                    location: 'MCAS Miramar',
                    cloud_threshold: '700',
                    vis_threshold: '9999',
                    wind_threshold: '15',
                    active_opmet: ['Groot', 'Rocket']
                },
                {
                    location: 'Exeter Airport',
                    cloud_threshold: '2000',
                    vis_threshold: '7000',
                    wind_threshold: '17',
                    active_opmet: ['Captain America', 'Starlord']
                },
                {
                    location: 'Newquay Airport',
                    cloud_threshold: '1500',
                    vis_threshold: '1500',
                    wind_threshold: '25',
                    active_opmet: []
                },
                {
                    location: 'Dunkeswell Aerodrome',
                    cloud_threshold: '500',
                    vis_threshold: '2000',
                    wind_threshold: '12',
                    active_opmet: ['Groot']
                },
                {
                    location: 'Heathrow Airport',
                    cloud_threshold: '600',
                    vis_threshold: '300',
                    wind_threshold: '25',
                    active_opmet: ['Rocket']
                }
            ]
        }
    }

    render() {
        const themeClass = classNames(
            this.props.themeIsDark ? 'Dark' : 'Light'
        );
        return (
            <div className={'Admin ' + themeClass}>
                <Status/>
                <div className="Scroll-Container">
                    <table>
                        <thead>
                        <tr>
                            <th onClick={event => this.onSort(event, 'location')} style={{cursor: 'pointer'}}>
                                Location
                            </th>
                            <th onClick={event => this.onSort(event, 'cloud_threshold')} style={{cursor: 'pointer'}}>
                                Cloud threshold
                            </th>
                            <th onClick={event => this.onSort(event, 'vis_threshold')} style={{cursor: 'pointer'}}>
                                Visibility threshold
                            </th>
                            <th onClick={event => this.onSort(event, 'wind_threshold')} style={{cursor: 'pointer'}}>
                                Wind threshold
                            </th>
                            <th>Active OpMet</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.favourites.map((element, index) => {
                            return (
                                <tr key={index}>
                                    <td data-label="location">{element.location}</td>
                                    <td data-label="cloud-threshold"
                                        style={{borderTop: '5px solid ' + states[Math.floor(Math.random() * states.length)]}}>{element.cloud_threshold}</td>
                                    <td data-label="vis-threshold"
                                        style={{borderTop: '5px solid ' + states[Math.floor(Math.random() * states.length)]}}>{element.vis_threshold}</td>
                                    <td data-label="cloud-threshold"
                                        style={{borderTop: '5px solid ' + states[Math.floor(Math.random() * states.length)]}}>{element.cloud_threshold}</td>
                                    <td data-label="active-opmet"
                                        style={{backgroundColor: element.active_opmet.length === 0 && '#696969'}}>
                                        {element.active_opmet.length !== 0 ? element.active_opmet.map((secondElement, secondIndex) => {
                                            return <img
                                                alt={secondElement}
                                                src={require('../../core/assets/' + secondElement.split(' ').join('').toLowerCase() + '-icon.svg')}
                                                key={secondElement}
                                                title={secondElement}/>
                                        }) : 'Inactive'}
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    onSort(event, sortKey) {
        const data = this.state.favourites;
        data.sort((a, b) => {
            let x = a[sortKey], y = b[sortKey];
            return this.state.isReversed ?
                (x === '-') - (y === '-') || -(x > y) || +(x < y) :
                (x === '-') - (y === '-') || +(x > y) || -(x < y);
        });
        this.setState({data, isReversed: !this.state.isReversed})
    }
}

const mapStateToProps = state => {
    return {
        themeIsDark: state.settings.themeIsDark
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);