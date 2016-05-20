import {
    FETCH_BOOKS,
    FETCH_BOOKS_SUCCESS,
    FETCH_BOOKS_ERROR,

    FETCH_BOOK,
    FETCH_BOOK_SUCCESS,
    FETCH_BOOK_ERROR,

    LOGOUT_SUCCESS
} from 'actions';

import without from 'lodash/array/without';
const initialState = {
    isFetching: false,
    fetchingBooks: []
};

export default function(state = initialState, action) {

    const { type, payload, errors, meta } = action;

    switch (type) {

        case LOGOUT_SUCCESS:
            return {
                ...initialState,
            };

        case FETCH_BOOK:
            let fetchingBooks = state.fetchingBooks;
            if (!fetchingBooks.includes(meta)) {
                fetchingBooks.push(meta);
            }
            return {
                ...state,
                fetchingBooks: state.fetchingBooks.push()
            };

        case FETCH_BOOK_SUCCESS:
            return {
                ...state,
                fetchingBooks: without(state.fetchingBooks, meta)
            }
        default:
            return state;
    }
}
