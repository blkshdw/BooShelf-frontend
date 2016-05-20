import { CALL_API, Schemas } from 'middleware/api'
import {
    UPDATE_REVIEW,
    UPDATE_REVIEW_SUCCESS,
    UPDATE_REVIEW_ERROR,

    FETCH_REVIEWS,
    FETCH_REVIEWS_SUCCESS,
    FETCH_REVIEWS_ERROR,

    FETCH_REVIEW,
    FETCH_REVIEW_SUCCESS,
    FETCH_REVIEW_ERROR,

    CREATE_REVIEW,
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_ERROR,

    DELETE_REVIEW,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_ERROR
}  from 'constants';


export function updateReview(reviewId, values) {
    return {
        [CALL_API]: {
            types: [
                UPDATE_REVIEW,
                UPDATE_REVIEW_SUCCESS,
                UPDATE_REVIEW_ERROR
            ],
            method: 'PUT',
            endpoint: '/reviews/' + reviewId,
            data: values,
            schema: Schemas.REVIEW
        },
        meta: { values }
    };
}

export function createReview(values) {
    return {
        [CALL_API]: {
            types: [
                CREATE_REVIEW,
                CREATE_REVIEW_SUCCESS,
                CREATE_REVIEW_ERROR
            ],
            method: 'POST',
            endpoint: '/reviews/',
            data: values,
            schema: Schemas.REVIEW
        },
        meta: { values }
    };
}

export function fetchReview(reviewId) {
    return {
        [CALL_API]: {
            types: [
                FETCH_REVIEW,
                FETCH_REVIEW_SUCCESS,
                FETCH_REVIEW_ERROR
            ],
            method: 'GET',
            endpoint: '/reviews/' + reviewId,
            data: values,
            schema: Schemas.REVIEW
        },
        meta: { values }
    };
}

export function fetchMyReviews(values) {
    return {
        [CALL_API]: {
            types: [
                FETCH_REVIEWS,
                FETCH_REVIEWS_SUCCESS,
                FETCH_REVIEWS_ERROR
            ],
            method: 'GET',
            endpoint: '/me/' + 'reviews',
            data: values,
            schema: Schemas.REVIEW_ARRAY
        },
        meta: { values }
    };
}

export function fetchUserReviews(userId) {
    return {
        [CALL_API]: {
            types: [
                FETCH_REVIEWS,
                FETCH_REVIEWS_SUCCESS,
                FETCH_REVIEWS_ERROR
            ],
            method: 'GET',
            endpoint: '/users/' + userId + 'reviews',
            data: values,
            schema: Schemas.REVIEW_ARRAY
        },
        meta: { values }
    };
}

export function fetchBookReviews(bookId) {
    return {
        [CALL_API]: {
            types: [
                FETCH_REVIEWS,
                FETCH_REVIEWS_SUCCESS,
                FETCH_REVIEWS_ERROR
            ],
            method: 'GET',
            endpoint: '/books/' + bookId + 'reviews',
            data: values,
            schema: Schemas.REVIEW_ARRAY
        },
        meta: { values }
    };
}

export function deleteReview(reviewId) {
    return {
        [CALL_API]: {
            types: [
                DELETE_REVIEW,
                DELETE_REVIEW_SUCCESS,
                DELETE_REVIEW_ERROR
            ],
            method: 'DELETE',
            endpoint: '/reviews/' + reviewId
        },
        meta: { reviewId }
    };
}