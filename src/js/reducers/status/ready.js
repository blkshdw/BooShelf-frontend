import {
    FETCH_INITIAL_DATA,
    FETCH_INITIAL_DATA_SUCCESS,
    FETCH_INITIAL_DATA_ERROR,
    LOGOUT_SUCCESS
} from 'constants';

const initialState = false;

export default function(state = initialState, action) {

    const { type } = action;

    switch (type) {

    case FETCH_INITIAL_DATA:
        return false;

    case FETCH_INITIAL_DATA_SUCCESS:
        return true;

    case FETCH_INITIAL_DATA_ERROR:
        return false;

    case LOGOUT_SUCCESS:
        return initialState;

    default:
        return state;
    }
}
