import { CALL_API } from 'middleware/api';
import { Schemas } from 'middleware';
import { entitySelector } from 'selectors';
import {
    FETCH_USERS,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_ERROR,

    REMOVE_USER,
    REMOVE_USER_SUCCESS,
    REMOVE_USER_ERROR,

    FETCH_USER,
    FETCH_USER_SUCCESS,
    FETCH_USER_ERROR,

    CREATE_USER,
    CREATE_USER_SUCCESS,
    CREATE_USER_ERROR,
} from 'constants';

export function fetchUsers(values) {
    return {
        [CALL_API]: {
            method: 'GET',
            types: [
                FETCH_USERS,
                FETCH_USERS_SUCCESS,
                FETCH_USERS_ERROR
            ],
            endpoint: '/users',
            schema: Schemas.USER_ARRAY
        },
        meta: { values }
    };
}

export function fetchUser(userId) {
    return {
        [CALL_API]: {
            types: [
                FETCH_USER,
                FETCH_USER_SUCCESS,
                FETCH_USER_ERROR
            ],
            method: 'GET',
            endpoint: '/users/' + userId,
            schema: Schemas.USER
        },
        meta: { userId }
    };
}

export function createUser(values) {
    return {
        [CALL_API]: {
            types: [
                CREATE_USER,
                CREATE_USER_SUCCESS,
                CREATE_USER_ERROR
            ],
            data: { 'query': `
              mutation {
                result: CreateUser(name: "${values.name}", email: "${values.email}", password: "${values.password}", role: ${values.role}) {
                      _id
                      email
                      name
                      role
                }
              }
            `},
            schema: Schemas.USER
        },
        meta: { values }
    };
}

export function deleteUser(id) {
    return {
        [CALL_API]: {
            types: [
                REMOVE_USER,
                REMOVE_USER_SUCCESS,
                REMOVE_USER_ERROR
            ],
            data: { 'query': `
              mutation {
                result: DeleteUser(_id: "${id}") {
                      _id
                      email
                      name
                      role
                }
              }
            `}
        },
        meta: { id }
    };
}

export function deleteUsers(ids) {
    return (dispatch) => {
        return {
            types: [
                REMOVE_USER,
                REMOVE_USER_SUCCESS,
                REMOVE_USER_ERROR
            ],
            payload: ids.map(id => dispatch(deleteUser(id)))
        };
    };
}
