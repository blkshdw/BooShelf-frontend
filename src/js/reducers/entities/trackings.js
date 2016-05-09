// import merge from 'lodash/object/merge';
import {
    LOGOUT_SUCCESS,
    REMOVE_TRACKING_SUCCESS

} from 'constants';
import { omit } from 'lodash';

const initialState = {};

export default function(state = initialState, action) {

    const { type, payload, meta } = action;

    switch (type) {
        case LOGOUT_SUCCESS:
            return initialState;

        case REMOVE_TRACKING_SUCCESS:
            return omit(state, meta.id);

        default:
            return state;
    }
}
