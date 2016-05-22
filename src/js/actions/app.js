import { fetchUsers } from './users';
import { fetchMyTrackings } from './trackings';
import { appIsReady } from 'selectors';
import {
    FETCH_INITIAL_DATA,
    FETCH_INITIAL_DATA_SUCCESS,
    FETCH_INITIAL_DATA_ERROR,

    TOGGLE_LEFT_PANEL,

    CHANGE_LOCALE
} from 'constants';

export function fetchInitialData() {
    return {
        types: [
            FETCH_INITIAL_DATA,
            FETCH_INITIAL_DATA_SUCCESS,
            FETCH_INITIAL_DATA_ERROR
        ],
        payload: [
            fetchMyTrackings  // for people section
        ]
    };
}

export function fetchInitialDataIfNeeded() {
    return (dispatch, getState) => {
        if (!appIsReady(getState())) {
            return dispatch(fetchInitialData());
        }
    };
}

export function toggleLeftPanel() {
    return {
        type: TOGGLE_LEFT_PANEL
    };
}

export function changeLocale(locale) {
    return {
        type: CHANGE_LOCALE,
        payload: locale
    };
}
