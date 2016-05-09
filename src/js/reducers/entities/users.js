// import merge from 'lodash/object/merge';
import {
    LOGOUT_SUCCESS,

    REMOVE_USER_SUCCESS,

//     UPDATE_CONTACT,
//     UPDATE_CONTACT_SUCCESS,
//     UPDATE_CONTACT_ERROR
 } from 'constants';
import { omit } from 'lodash';

const initialState = {};

export default function(state = initialState, action) {

    const { type, payload, meta } = action;

    switch (type) {
    case LOGOUT_SUCCESS:
        return initialState;

    case REMOVE_USER_SUCCESS:
        return omit(state, meta.id);

    // case UPDATE_CONTACT:
    //     return merge({}, state, { [meta.id]: { isPending: true } });

    // case UPDATE_CONTACT_SUCCESS:
    // case UPDATE_CONTACT_ERROR:
    //     return merge({}, state, { [meta.id]: { isPending: false } });

    default:
        return state;
    }
}
