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

    CREATE_USER,
    CREATE_USER_SUCCESS,
    CREATE_USER_ERROR,
} from 'constants';

export function fetchUsers(values) {
    return {
        [CALL_API]: {
            types: [
                FETCH_USERS,
                FETCH_USERS_SUCCESS,
                FETCH_USERS_ERROR
            ],
            data: {'query': `
                query {
                  result: users {
                      _id
                      email
                      name
                      role
                  }
                }
            `},
            schema: Schemas.USER_ARRAY
        },
        meta: { values }
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


export function fetchUserIfNeeded(id) {
    return (dispatch, getState) => {
        if (!entitySelector('users', id)(getState())) {
            return dispatch(fetchUser(id));
        }
    };
}
