import {
    CHANGE_LOCALE,
    LOGIN_SUCCESS,
    CHECK_AUTH_SUCCESS,
    UPDATE_USER_SUCCESS,
    REGISTRATION_SUCCESS
} from 'constants';

const initialState = {
    locale: 'en_US'
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

    case CHANGE_LOCALE:
        return {
            ...state,
            locale: payload
        };
/* devall
    case LOGIN_SUCCESS:
    case CHECK_AUTH_SUCCESS:
    case UPDATE_USER_SUCCESS:
    case REGISTRATION_SUCCESS:
        return {
            ...state,
            locale: payload.entities.users[payload.result].locale || state.locale
        };
*/


    default:
        return state;
    }
}
