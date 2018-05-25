// @flow
import {
    LOCATION_SELECTED
} from '../actions/location.actions';

const initialState = {
    selectedLocation: null
};

export function handleLocationsAPIActions(state = initialState, action) { // NOSONAR
    const {payload, type} = action;
    switch (type) {
        case LOCATION_SELECTED:
            return {...state, selectedLocation: payload};
        default:
            return state;
    }
}