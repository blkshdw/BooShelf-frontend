import {
    FETCH_REVIEWS,
    FETCH_REVIEWS_SUCCESS,
    FETCH_REVIEWS_ERROR,

    FETCH_REVIEW,
    FETCH_REVIEW_SUCCESS,
    FETCH_REVIEW_ERROR,

    CREATE_REVIEW,
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_ERROR,

    UPDATE_REVIEW,
    UPDATE_REVIEW_SUCCESS,
    UPDATE_REVIEW_ERROR,

    REMOVE_REVIEW,
    REMOVE_REVIEW_SUCCESS,
    REMOVE_REVIEW_ERROR,

    LOGOUT_SUCCESS
} from 'constants';


const initialState = {
    isFetching: false,
    isUpdating: false,
    error: null,
};

export default function(state = initialState, action) {

    const { type, payload, error } = action;

    switch (type) {

        case FETCH_REVIEWS:
        case FETCH_REVIEW:
            return {
                ...state,
                isFetching: true
            };

        case FETCH_REVIEWS_SUCCESS:
        case FETCH_REVIEW_SUCCESS:
            return {
                ...state,
                isFetching: false
            };

        case FETCH_REVIEW_ERROR:
        case FETCH_REVIEWS_ERROR:
            return {
                ...state,
                isFetching: false,
                error: payload
            };
        case REMOVE_REVIEW:
        case CREATE_REVIEW:
        case UPDATE_REVIEW:
            return {
                ...state,
                isUpdating: true
            }
        case CREATE_REVIEW_ERROR:
        case REMOVE_REVIEW_ERROR:
        case UPDATE_REVIEW_ERROR:
            return {
                ...state,
                isUpdating: false,
                error: error
            }
        case CREATE_REVIEW_SUCCESS:
        case REMOVE_REVIEW_SUCCESS:
        case UPDATE_REVIEW_SUCCESS:
            return {
                ...state,
                isUpdating: false,
            }
        case LOGOUT_SUCCESS:
            return initialState;

        default:
            return state;
    }
}