// @flow
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {handleLocationsAPIActions} from './locations.reducer';
import {handleForecastAPIActions} from './forecast.reducer';
import {handleSettingsActions} from './settings.reducer';
import {handleNotificationActions} from './notifications.reducer';

const rootReducer = combineReducers({
    locationsReducer: handleLocationsAPIActions,
    forecastReducer: handleForecastAPIActions,
    notifications: handleNotificationActions,
    settings: handleSettingsActions,
    routerReducer
});

export default rootReducer;

