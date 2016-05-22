import {
    FETCH_USERS,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_ERROR,

    LOGOUT_SUCCESS,

    UPDATE_PROFILE,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_ERROR
} from 'constants';


const initialState = {
    isFetching: false,
    isUpdating: false,
    error: ''
};

export default function(state = initialState, action) {

    const { type, payload, error } = action;

    switch (type) {

        case UPDATE_PROFILE:
            return {
                ...state,
                isUpdating: true
            }

        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                isUpdating: false
            }

        case UPDATE_PROFILE_ERROR:
            return {
                ...state,
                isUpdating: false,
                error: error
            }

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
