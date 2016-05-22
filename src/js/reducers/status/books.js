import {
    FETCH_BOOKS,
    FETCH_BOOKS_SUCCESS,
    FETCH_BOOKS_ERROR,

    FETCH_BOOK,
    FETCH_BOOK_SUCCESS,
    FETCH_BOOK_ERROR,

    CREATE_BOOK,
    CREATE_BOOK_SUCCESS,
    CREATE_BOOK_ERROR,

    BOOKS_FILTER_TITLE,
    BOOKS_FILTER_GENRE,
    BOOKS_FILTER_AUTHOR,
    BOOKS_CLEAR_FILTERS,

    LOGOUT_SUCCESS
} from 'constants';

import without from 'lodash/array/without';
const initialState = {
    isFetching: false,
    isCreating: false,
    updateCompleted: false,
    currentFilterAuthor: '',
    currentFilterTitle: '',
    currentFilterGenre: '',
    fetchingBooks: []
};

export default function(state = initialState, action) {

    const { type, payload, error, meta } = action;

    switch (type) {

        case LOGOUT_SUCCESS:
            return {
                ...initialState,
            };

        case CREATE_BOOK:
            return {
                ...state,
                error: '',
                isCreating: true
            }
        case CREATE_BOOK_ERROR:
            return {
                ...state,
                error: error,
                isCreating: false
            }
        case CREATE_BOOK_SUCCESS:
            return {
                ...state,
                error: '',
                isCreating: false
            }
        case BOOKS_FILTER_TITLE:
            return {
                ...state,
                currentFilterTitle: payload
            };

        case BOOKS_FILTER_GENRE:
            return {
                ...state,
                currentFilterGenre: payload
            };

        case BOOKS_FILTER_AUTHOR:
            return {
                ...state,
                currentFilterAuthor: payload
            };

        case BOOKS_CLEAR_FILTERS:
            return {
                ...state,
                currentFilterAuthor: '',
                currentFilterGenre: '',
                currentFilterTitle: ''
            }

        case FETCH_BOOK:
            return {
                ...state,
                isFetching: true
            }

        case FETCH_BOOK_ERROR:
            return {
                ...state,
                isFetching: false,
                error: error
            }

        case FETCH_BOOK_SUCCESS:
            return {
                ...state,
                isFetching: false
            }
        default:
            return state;
    }
}
