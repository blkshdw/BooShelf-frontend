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

    UPDATE_BOOK,
    UPDATE_BOOK_SUCCESS,
    UPDATE_BOOK_ERROR,

    BOOKS_FILTER_TITLE,
    BOOKS_FILTER_GENRE,
    BOOKS_FILTER_AUTHOR,
    BOOKS_CLEAR_FILTERS,

    LOGOUT_SUCCESS
} from 'constants';

import without from 'lodash/array/without';
const initialState = {
    isFetching: false,
    isUpdating: false,
    error: '',
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

        case FETCH_BOOKS:
            return {
                ...state,
                isFetching: true
            }

        case FETCH_BOOKS_SUCCESS:
            return {
                ...state,
                isFetching: false
            }

        case FETCH_BOOKS_ERROR:
            return {
                ...state,
                isFetching: false
            }


        case UPDATE_BOOK:
        case CREATE_BOOK:
            return {
                ...state,
                error: '',
                isUpdating: true
            }

        case UPDATE_BOOK_ERROR:
        case CREATE_BOOK_ERROR:
            return {
                ...state,
                error: error,
                isUpdating: false
            }

        case UPDATE_BOOK_SUCCESS:
        case CREATE_BOOK_SUCCESS:
            return {
                ...state,
                error: '',
                isUpdating: false
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
            const newBooks = state.fetchingBooks;
            if (newBooks.indexOf(meta) < 0) {
                newBooks.push(meta);
            }
            return {
                ...state,
                isFetching: true,
                fetchingBooks: newBooks
            }

        case FETCH_BOOK_ERROR:
            return {
                ...state,
                isFetching: false,
                error: error,
                fetchingBooks: without(state.fetchingBooks, meta)
            }

        case FETCH_BOOK_SUCCESS:
            return {
                ...state,
                isFetching: false,
                fetchingBooks: without(state.fetchingBooks, meta)
            }
        default:
            return state;
    }
}
