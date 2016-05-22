import {
    REGISTRATION,
    REGISTRATION_SUCCESS,
    REGISTRATION_ERROR,

    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_ERROR,

    CHECK_AUTH,
    CHECK_AUTH_SUCCESS,
    CHECK_AUTH_ERROR,

    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR,

} from 'constants';

const initialState = {
    user: null,
    token: window.localStorage.getItem('token'),
    isLoginLoading: false,
    isCheckAuthLoading: false,
    isUpdating: false,
    checkAuthError: '',
    errors: []
};

export default function(state = initialState, action) {

    const { type, payload, errors, error } = action;

    switch (type) {

    case REGISTRATION:
    case LOGIN:
        return {
            ...initialState,
            isLoginLoading: true
        };

    case CHECK_AUTH:
        return {
            ...state,
            isCheckAuthLoading: true
        };

    case CHECK_AUTH_SUCCESS:
        return {
            ...initialState,
            user: payload.result,
        };

        case REGISTRATION_SUCCESS:
        window.localStorage.setItem('token', payload.entities.users[payload.result].token);
        return {
            ...initialState,
            user: payload.result,
            token: payload.entities.users[payload.result].token,
            error: ''
        };

    case LOGIN_SUCCESS:
        window.localStorage.setItem('token', payload.entities.users[payload.result].token);
        return {
            ...initialState,
            user: payload.result,
            token:  payload.entities.users[payload.result].token,
            error: ''
        };

    case REGISTRATION_ERROR:
    case LOGIN_ERROR:
    case LOGOUT_ERROR:
        return {
            ...initialState,
            errors: errors,
            error: error
        };

    case CHECK_AUTH_ERROR:
        return {
            ...initialState,
            checkAuthError: payload
        };

        case LOGOUT_SUCCESS:
            window.localStorage.removeItem('token');
        return {
            ...initialState,
            token: null,
            user: null
        };

    default:
        return state;
    }
}
