export const forecast = {
    'SiteRep': {
        'Wx': {
            'Param': [{
                'name': 'FDm',
                'units': 'C',
                '$': 'Feels Like Day Maximum Temperature'
            }, {'name': 'FNm', 'units': 'C', '$': 'Feels Like Night Minimum Temperature'}, {
                'name': 'Dm',
                'units': 'C',
                '$': 'Day Maximum Temperature'
            }, {'name': 'Nm', 'units': 'C', '$': 'Night Minimum Temperature'}, {
                'name': 'Gn',
                'units': 'mph',
                '$': 'Wind Gust Noon'
            }, {'name': 'Gm', 'units': 'mph', '$': 'Wind Gust Midnight'}, {
                'name': 'Hn',
                'units': '%',
                '$': 'Screen Relative Humidity Noon'
            }, {'name': 'Hm', 'units': '%', '$': 'Screen Relative Humidity Midnight'}, {
                'name': 'V',
                'units': '',
                '$': 'Visibility'
            }, {'name': 'D', 'units': 'compass', '$': 'Wind Direction'}, {
                'name': 'S',
                'units': 'mph',
                '$': 'Wind Speed'
            }, {'name': 'U', 'units': '', '$': 'Max UV Index'}, {'name': 'W', 'units': '', '$': 'Weather Type'}, {
                'name': 'PPd',
                'units': '%',
                '$': 'Precipitation Probability Day'
            }, {'name': 'PPn', 'units': '%', '$': 'Precipitation Probability Night'}]
        },
        'DV': {
            'dataDate': '2018-04-04T07:00:00Z',
            'type': 'Forecast',
            'Location': {
                'i': '350001',
                'lat': '56.8716',
                'lon': '-4.1969',
                'name': 'A\' BHUIDHEANACH BHEAG',
                'country': 'SCOTLAND',
                'continent': 'EUROPE',
                'elevation': '936.0',
                'Period': [{
                    'type': 'Day',
                    'value': '2018-04-04Z',
                    'Rep': [{
                        'D': 'NNE',
                        'Gn': '38',
                        'Hn': '100',
                        'PPd': '98',
                        'S': '31',
                        'V': 'VP',
                        'Dm': '-4',
                        'FDm': '-11',
                        'W': '24',
                        'U': '2',
                        '$': 'Day'
                    }, {
                        'D': 'NNW',
                        'Gm': '22',
                        'Hm': '78',
                        'PPn': '21',
                        'S': '18',
                        'V': 'EX',
                        'Nm': '-7',
                        'FNm': '-16',
                        'W': '2',
                        '$': 'Night'
                    }]
                }, {
                    'type': 'Day',
                    'value': '2018-04-05Z',
                    'Rep': [{
                        'D': 'W',
                        'Gn': '22',
                        'Hn': '92',
                        'PPd': '56',
                        'S': '16',
                        'V': 'MO',
                        'Dm': '-2',
                        'FDm': '-7',
                        'W': '24',
                        'U': '4',
                        '$': 'Day'
                    }, {
                        'D': 'SE',
                        'Gm': '25',
                        'Hm': '85',
                        'PPn': '63',
                        'S': '20',
                        'V': 'VG',
                        'Nm': '-4',
                        'FNm': '-12',
                        'W': '24',
                        '$': 'Night'
                    }]
                }, {
                    'type': 'Day',
                    'value': '2018-04-06Z',
                    'Rep': [{
                        'D': 'SE',
                        'Gn': '47',
                        'Hn': '92',
                        'PPd': '85',
                        'S': '31',
                        'V': 'MO',
                        'Dm': '1',
                        'FDm': '-8',
                        'W': '27',
                        'U': '2',
                        '$': 'Day'
                    }, {
                        'D': 'SSE',
                        'Gm': '40',
                        'Hm': '97',
                        'PPn': '62',
                        'S': '29',
                        'V': 'PO',
                        'Nm': '0',
                        'FNm': '-8',
                        'W': '18',
                        '$': 'Night'
                    }]
                }, {
                    'type': 'Day',
                    'value': '2018-04-07Z',
                    'Rep': [{
                        'D': 'S',
                        'Gn': '25',
                        'Hn': '92',
                        'PPd': '23',
                        'S': '16',
                        'V': 'GO',
                        'Dm': '3',
                        'FDm': '-2',
                        'W': '7',
                        'U': '2',
                        '$': 'Day'
                    }, {
                        'D': 'WSW',
                        'Gm': '18',
                        'Hm': '95',
                        'PPn': '19',
                        'S': '13',
                        'V': 'GO',
                        'Nm': '-1',
                        'FNm': '-6',
                        'W': '7',
                        '$': 'Night'
                    }]
                }, {
                    'type': 'Day',
                    'value': '2018-04-08Z',
                    'Rep': [{
                        'D': 'E',
                        'Gn': '20',
                        'Hn': '86',
                        'PPd': '38',
                        'S': '11',
                        'V': 'GO',
                        'Dm': '3',
                        'FDm': '-2',
                        'W': '7',
                        'U': '2',
                        '$': 'Day'
                    }, {
                        'D': 'ESE',
                        'Gm': '16',
                        'Hm': '93',
                        'PPn': '38',
                        'S': '11',
                        'V': 'GO',
                        'Nm': '-2',
                        'FNm': '-7',
                        'W': '7',
                        '$': 'Night'
                    }]
                }]
            }
        }
    }
};
export const successful = {};
export const failure = 404;