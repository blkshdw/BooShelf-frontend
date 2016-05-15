import {
    FETCH_TRACKINGS,
    FETCH_TRACKINGS_SUCCESS,
    FETCH_TRACKINGS_ERROR,

    FETCH_TRACKING,
    FETCH_TRACKING_SUCCESS,
    FETCH_TRACKING_ERROR,

    LOGOUT_SUCCESS
} from 'constants';


const initialState = {
    isFetching: false,
    error: null,
};

export default function(state = initialState, action) {

    const { type, payload } = action;

    switch (type) {

        case FETCH_TRACKINGS:
        case FETCH_TRACKING:
            return {
                ...state,
                isFetching: true
            };

        case FETCH_TRACKINGS_SUCCESS:
        case FETCH_TRACKING_SUCCESS:
            return {
                ...state,
                isFetching: false,
            };

        case FETCH_TRACKING_ERROR:
        case FETCH_TRACKINGS_ERROR:
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