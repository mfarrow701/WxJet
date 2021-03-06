// @flow
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {handleLocationsAPIActions} from './locations.reducer';
import {handleForecastAPIActions} from './forecast.reducer';
import {handleSettingsActions} from './settings.reducer';

const rootReducer = combineReducers({
    locationsReducer: handleLocationsAPIActions,
    forecastReducer: handleForecastAPIActions,
    settings: handleSettingsActions,
    routerReducer
});

export default rootReducer;

