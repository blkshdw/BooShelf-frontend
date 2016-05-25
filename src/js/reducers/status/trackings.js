import {
    FETCH_TRACKINGS,
    FETCH_TRACKINGS_SUCCESS,
    FETCH_TRACKINGS_ERROR,

    FETCH_TRACKING,
    FETCH_TRACKING_SUCCESS,
    FETCH_TRACKING_ERROR,

    REMOVE_TRACKING,
    REMOVE_TRACKING_SUCCESS,
    REMOVE_TRACKING_ERROR,

    UPDATE_TRACKING,
    UPDATE_TRACKING_SUCCESS,
    UPDATE_TRACKING_ERROR,

    CREATE_TRACKING,
    CREATE_TRACKING_SUCCESS,
    CREATE_TRACKING_ERROR,


    LOGOUT_SUCCESS
} from 'constants';


const initialState = {
    isFetching: false,
    isUpdating: false,
    error: '',
};

export default function(state = initialState, action) {

    const { type, payload, error } = action;

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

        case UPDATE_TRACKING:
        case REMOVE_TRACKING:
        case CREATE_TRACKING:
            return {
                ...state,
                isUpdating: true
            }

        case UPDATE_TRACKING_SUCCESS:
        case REMOVE_TRACKING_SUCCESS:
        case CREATE_TRACKING_SUCCESS:
            return {
                ...state,
                isUpdating: false
            }

        case UPDATE_TRACKING_ERROR:
        case REMOVE_TRACKING_ERROR:
        case CREATE_TRACKING_ERROR:
            return {
                ...state,
                isUpdating: false,
                error: error
            }

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