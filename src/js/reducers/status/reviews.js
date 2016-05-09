import {
    FETCH_REVIEWS,
    FETCH_REVIEWS_SUCCESS,
    FETCH_REVIEWS_ERROR,

    FETCH_REVIEW,
    FETCH_REVIEW_SUCCESS,
    FETCH_REVIEW_ERROR,

    LOGOUT_SUCCESS
} from 'constants';


const initialState = {
    isFetching: false,
    error: null,
};

export default function(state = initialState, action) {

    const { type, payload } = action;

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
                isFetching: false,
            };

        case FETCH_REVIEW_ERROR:
        case FETCH_REVIEWS_ERROR:
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