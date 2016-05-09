import {
    FETCH_USERS,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_ERROR,

    LOGOUT_SUCCESS
} from 'constants';


const initialState = {
    isFetching: false,
    error: null,
};

export default function(state = initialState, action) {

    const { type, payload } = action;

    switch (type) {

    case FETCH_USERS:
        return {
            ...state,
            isFetching: true
        };

    case FETCH_USERS_SUCCESS:
        return {
            ...state,
            isFetching: false,
        };

    case FETCH_USERS_ERROR:
        return {
            ...state,
            isFetching: false,
            error: payload
        };

    case LOGOUT_SUCCESS:
        return initialState;

    default:
        return state;
    }
}
