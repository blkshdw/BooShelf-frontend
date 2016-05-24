// import merge from 'lodash/object/merge';
import {
    LOGOUT_SUCCESS,
    REMOVE_BOOK_SUCCESS,
    REMOVE_REVIEW_SUCCESS,

    CREATE_TRACKING_SUCCESS,

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
            return Object.assign({}, state, { [meta.tracking.book]: {
                ...state[meta.tracking.book],
                popularity: state[meta.tracking.book].popularity - 1
            }
            });

        case CREATE_TRACKING_SUCCESS:
            return Object.assign({}, state, { [meta.tracking.book]: {
                ...state[meta.tracking.book],
                popularity: state[meta.tracking.book].popularity + 1
            }
            });


        case REMOVE_BOOK_SUCCESS:
            return omit(state, meta.bookId);

        default:
            return state;
    }
}
