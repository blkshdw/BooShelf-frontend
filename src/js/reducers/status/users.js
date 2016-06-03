import {
    FETCH_USERS,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_ERROR,

    FETCH_USER,
    FETCH_USER_SUCCESS,
    FETCH_USER_ERROR,

    LOGOUT_SUCCESS,

    UPDATE_PROFILE,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_ERROR
} from 'constants';
import without from 'lodash/array/without';

const initialState = {
    isFetching: false,
    isUpdating: false,
    fetchingUsers: [],
    error: ''
};

export default function(state = initialState, action) {

    const { type, payload, error, meta } = action;

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

        case FETCH_USER:
            const newUsers = state.fetchingUsers;
            if (newUsers.indexOf(meta) < 0) {
                newUsers.push(meta);
            }
            return {
                ...state,
                fetchingUsers: newUsers
            }

        case FETCH_USER_ERROR:
            return {
                ...state,
                fetchingUsers: without(state.fetchingUsers, meta),
                error: error
            }

        case FETCH_USER_SUCCESS:
            return {
                ...state,
                fetchingUsers: without(state.fetchingUsers, meta)
            }
    case FETCH_USERS:
        return {
            ...state,
            isFetching: true,
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
        return {
            ...initialState,
            fetchingUsers: []
        }

    default:
        return state;
    }
}
