import { CALL_API, Schemas } from 'middleware/api'
import {
    UPDATE_BOOK,
    UPDATE_BOOK_SUCCESS,
    UPDATE_BOOK_ERROR,

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
    BOOKS_CLEAR_FILTERS

}  from 'constants';


export function updateBook(bookId, values) {
    return {
        [CALL_API]: {
            types: [
                UPDATE_BOOK,
                UPDATE_BOOK_SUCCESS,
                UPDATE_BOOK_ERROR
            ],
            method: 'PUT',
            endpoint: '/books/' + bookId,
            data: values,
            schema: Schemas.BOOK
        },
        meta: { values }
    };
}

export function createBook(values) {
    return {
        [CALL_API]: {
            types: [
                CREATE_BOOK,
                CREATE_BOOK_SUCCESS,
                CREATE_BOOK_ERROR
            ],
            method: 'POST',
            endpoint: '/books',
            data: values,
            schema: Schemas.BOOK
        },
        meta: { values }
    };
}

export function fetchBook(bookId) {
    return {
        [CALL_API]: {
            types: [
                FETCH_BOOK,
                FETCH_BOOK_SUCCESS,
                FETCH_BOOKS_ERROR
            ],
            method: 'GET',
            endpoint: '/books/' + bookId,
            schema: Schemas.BOOK
        },
        meta: bookId
    };
}

export function fetchBooks(values) {
    return {
        [CALL_API]: {
            types: [
                FETCH_BOOKS,
                FETCH_BOOKS_SUCCESS,
                FETCH_BOOKS_ERROR
            ],
            method: 'GET',
            endpoint: '/books',
            data: values,
            schema: Schemas.BOOK_ARRAY
        },
        meta: { values }
    };
}

export function fetchMyBooks() {
    return {
        [CALL_API]: {
            types: [
                FETCH_BOOKS,
                FETCH_BOOKS_SUCCESS,
                FETCH_BOOKS_ERROR
            ],
            method: 'GET',
            endpoint: '/me/' + 'books',
            data: values,
            schema: Schemas.REVIEW_ARRAY
        },
        meta: { values }
    };
}

export function booksFilterTitle(title) {
    return {
        type: BOOKS_FILTER_TITLE,
        payload: title
    }
}

export function booksFilterGenre(genre) {
    return {
        type: BOOKS_FILTER_GENRE,
        payload: genre
    }
}

export function booksFilterAuthor(author) {
    return {
        type: BOOKS_FILTER_AUTHOR,
        payload: author
    }
}

export function booksClearFilters() {
    return {
        type:  BOOKS_CLEAR_FILTERS
    }
}