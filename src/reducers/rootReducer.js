// @flow
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {handleAuthenticationActions} from './authentication.reducer';
import {handleLocationsAPIActions} from './locations.reducer';
import {handleForecastAPIActions} from './forecast.reducer';
import {handleSettingsActions} from './settings.reducer';
import {handleNotificationActions} from './notifications.reducer';

const rootReducer = combineReducers({
    authentication: handleAuthenticationActions,
    locationsReducer: handleLocationsAPIActions,
    forecastReducer: handleForecastAPIActions,
    notifications: handleNotificationActions,
    settings: handleSettingsActions,
    routerReducer
});

export default rootReducer;

