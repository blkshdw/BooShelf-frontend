import { CALL_API, Schemas } from 'middleware/api';
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

    UPDATE_CONNECTION_STATUS,

    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR,

} from 'constants';

export function registrationSubmit(values) {
    return {
        [CALL_API]: {
            types: [
                REGISTRATION,
                REGISTRATION_SUCCESS,
                REGISTRATION_ERROR
            ],
            method: 'POST',
            endpoint: '/users',
            data: values,
            schema: Schemas.USER
        },
        meta: { values }
    };
}

export function loginSubmit(values) {
    return {
        [CALL_API]: {
            types: [
                LOGIN,
                LOGIN_SUCCESS,
                LOGIN_ERROR
            ],
            method: 'POST',
            endpoint: '/login',
            data: values,
            schema: Schemas.USER
        },
        meta: { values }
    };
}

export function checkAuth() {
    console.log(CALL_API);
    return {
        [CALL_API]: {
            types: [
                CHECK_AUTH,
                CHECK_AUTH_SUCCESS,
                CHECK_AUTH_ERROR
            ],
            method: 'GET',
            endpoint: '/me',
            schema: Schemas.USER
        }
    };
}

export function logoutSubmit(values) {
    return {
        [CALL_API]: {
            types: [
                LOGOUT,
                LOGOUT_SUCCESS,
                LOGOUT_ERROR
            ],
            method: 'GET',
            endpoint: '/logout',
            query: values,
            schema: Schemas.USER
        },
        meta: { values }
    };
}

export function updateConnectionStatus(value) {
    return { type: UPDATE_CONNECTION_STATUS, payload: value };
}
