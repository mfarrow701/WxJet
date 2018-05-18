// @flow
import {getMoonIllumination} from 'suncalc';

export const cloudTypes = [{
    'option': 'Cirrus',
    'value': '1'
}, {
    'option': 'Cirrocumulus',
    'value': '2'
}, {
    'option': 'Cirrostratus',
    'value': '3'
}, {
    'option': 'Altocumulus',
    'value': '4'
}, {
    'option': 'Altostratus',
    'value': '5'
}, {
    'option': 'Stratocumulus',
    'value': '6'
}, {
    'option': 'Cumulus',
    'value': '7'
}, {
    'option': 'Cumulonimbus',
    'value': '8'
}, {
    'option': 'Nimbostratus',
    'value': '9'
}];

export function calculatePercentagePosition(maxAltitude, cloud) {
    return {
        top: (100 - ((cloud.attributes.altitude / maxAltitude) * 100)).toString() + '%',
        left: cloud.left
    }
}

export function getLunarPhase(date) {
    const lunarIllumination = getMoonIllumination(date),
        lunarPhase = Math.round(lunarIllumination.phase * 28) / 28,
        lunarLuminosity = Math.round(lunarIllumination.fraction * 100);

    if (lunarPhase === 0 || lunarPhase === 1) return {
        img: 'newMoon',
        phase: 'New moon',
        luminosity: lunarLuminosity
    };
    if (lunarPhase > 0 && lunarPhase < 0.25) return {
        img: 'waxingCrescent',
        phase: 'Waxing crescent',
        luminosity: lunarLuminosity
    };
    if (lunarPhase === 0.25) return {
        img: 'firstQuarter',
        phase: 'First quarter',
        luminosity: lunarLuminosity
    };
    if (lunarPhase > 0.25 && lunarPhase < 0.5) return {
        img: 'waxingGibbous',
        phase: 'Waxing gibbous',
        luminosity: lunarLuminosity
    };
    if (lunarPhase === 0.5) return {
        img: 'fullMoon',
        phase: 'Full moon',
        luminosity: lunarLuminosity
    };
    if (lunarPhase > 0.5 && lunarPhase < 0.75) return {
        img: 'waningGibbous',
        phase: 'Waning gibbous',
        luminosity: lunarLuminosity
    };
    if (lunarPhase === 0.75) return {
        img: 'thirdQuarter',
        phase: 'Third quarter',
        luminosity: lunarLuminosity
    };
    if (lunarPhase > 0.75 && lunarPhase < 1) return {
        img: 'waningCrescent',
        phase: 'Waning crescent',
        luminosity: lunarLuminosity
    };
}

export function generateXSectionScale(maxAltitude) {
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

export function generateXSectionWeather() {
    return [
        {
            id: '1',
            cloud: '1',
            top: Math.floor(Math.random() * 101).toString() + '%',
            left: Math.floor(Math.random() * 101).toString() + '%',
            attributes: {
                altitude: Math.floor(Math.random() * 35000),
                type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]['option']
            }
        },
        {
            id: '2',
            cloud: '2',
            top: Math.floor(Math.random() * 101).toString() + '%',
            left: Math.floor(Math.random() * 101).toString() + '%',
            attributes: {
                altitude: Math.floor(Math.random() * 35000),
                type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]['option']
            }
        },
        {
            id: '3',
            cloud: '3',
            top: Math.floor(Math.random() * 101).toString() + '%',
            left: Math.floor(Math.random() * 101).toString() + '%',
            attributes: {
                altitude: Math.floor(Math.random() * 35000),
                type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]['option']
            }
        },
        {
            id: '4',
            cloud: '4',
            top: Math.floor(Math.random() * 101).toString() + '%',
            left: Math.floor(Math.random() * 101).toString() + '%',
            attributes: {
                altitude: Math.floor(Math.random() * 35000),
                type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]['option']
            }
        },
        {
            id: '5',
            cloud: '5',
            top: Math.floor(Math.random() * 101).toString() + '%',
            left: Math.floor(Math.random() * 101).toString() + '%',
            attributes: {
                altitude: Math.floor(Math.random() * 35000),
                type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]['option']
            }
        },
        {
            id: '6',
            cloud: '6',
            top: Math.floor(Math.random() * 101).toString() + '%',
            left: Math.floor(Math.random() * 101).toString() + '%',
            attributes: {
                altitude: Math.floor(Math.random() * 35000),
                type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]['option']
            }
        },
        {
            id: '7',
            cloud: '7',
            top: Math.floor(Math.random() * 101).toString() + '%',
            left: Math.floor(Math.random() * 101).toString() + '%',
            attributes: {
                altitude: Math.floor(Math.random() * 35000),
                type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]['option']
            }
        },
        {
            id: '8',
            cloud: '8',
            top: Math.floor(Math.random() * 101).toString() + '%',
            left: Math.floor(Math.random() * 101).toString() + '%',
            attributes: {
                altitude: Math.floor(Math.random() * 35000),
                type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]['option']
            }
        },
        {
            id: '9',
            cloud: '9',
            top: Math.floor(Math.random() * 101).toString() + '%',
            left: Math.floor(Math.random() * 101).toString() + '%',
            attributes: {
                altitude: Math.floor(Math.random() * 35000),
                type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]['option']
            }
        },
        {
            id: '10',
            cloud: '1',
            top: Math.floor(Math.random() * 101).toString() + '%',
            left: Math.floor(Math.random() * 101).toString() + '%',
            attributes: {
                altitude: Math.floor(Math.random() * 35000),
                type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]['option']
            }
        },
        {
            id: '111',
            cloud: '2',
            top: Math.floor(Math.random() * 101).toString() + '%',
            left: Math.floor(Math.random() * 101).toString() + '%',
            attributes: {
                altitude: Math.floor(Math.random() * 35000),
                type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]['option']
            }
        },
        {
            id: '12',
            cloud: '3',
            top: Math.floor(Math.random() * 101).toString() + '%',
            left: Math.floor(Math.random() * 101).toString() + '%',
            attributes: {
                altitude: Math.floor(Math.random() * 35000),
                type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]['option']
            }
        },
        {
            id: '13',
            cloud: '4',
            top: Math.floor(Math.random() * 101).toString() + '%',
            left: Math.floor(Math.random() * 101).toString() + '%',
            attributes: {
                altitude: Math.floor(Math.random() * 35000),
                type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]['option']
            }
        },
        {
            id: '14',
            cloud: '5',
            top: Math.floor(Math.random() * 101).toString() + '%',
            left: Math.floor(Math.random() * 101).toString() + '%',
            attributes: {
                altitude: Math.floor(Math.random() * 35000),
                type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]['option']
            }
        },
        {
            id: '15',
            cloud: '6',
            top: Math.floor(Math.random() * 101).toString() + '%',
            left: Math.floor(Math.random() * 101).toString() + '%',
            attributes: {
                altitude: Math.floor(Math.random() * 35000),
                type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]['option']
            }
        },
        {
            id: '16',
            cloud: '7',
            top: Math.floor(Math.random() * 101).toString() + '%',
            left: Math.floor(Math.random() * 101).toString() + '%',
            attributes: {
                altitude: Math.floor(Math.random() * 35000),
                type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]['option']
            }
        },
        {
            id: '17',
            cloud: '8',
            top: Math.floor(Math.random() * 101).toString() + '%',
            left: Math.floor(Math.random() * 101).toString() + '%',
            attributes: {
                altitude: Math.floor(Math.random() * 35000),
                type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]['option']
            }
        },
        {
            id: '18',
            cloud: '9',
            top: Math.floor(Math.random() * 101).toString() + '%',
            left: Math.floor(Math.random() * 101).toString() + '%',
            attributes: {
                altitude: Math.floor(Math.random() * 35000),
                type: cloudTypes[Math.floor(Math.random() * cloudTypes.length)]['option']
            }
        }
    ]
}