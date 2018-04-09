// @flow
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {handleLocationsAPIActions} from './locations.reducer';
import {handleForecastAPIActions} from './forecast.reducer';

const rootReducer = combineReducers({
    locationsReducer: handleLocationsAPIActions,
    forecastReducer: handleForecastAPIActions,
    routerReducer
});

export default rootReducer;

