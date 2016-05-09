import { fetchUsers } from './users';
import { fetchTickets, fetchTicketsCount } from './tickets';
import { appIsReady } from 'selectors';
import {
    FETCH_INITIAL_DATA,
    FETCH_INITIAL_DATA_SUCCESS,
    FETCH_INITIAL_DATA_ERROR,

    TOGGLE_LEFT_PANEL,

    CHANGE_LOCALE
} from 'constants';

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
