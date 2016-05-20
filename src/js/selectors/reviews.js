import {
    createDeepEqualSelector,
    entitiesArraySelector,
    statusSelector,
    entitiesSelector,
    currentUserSelector
} from './common';

export const myReviewsSelector = createDeepEqualSelector(
    [currentUserSelector, entitiesArraySelector('reviews'), entitiesSelector('books'), statusSelector('books')],
    (currentUser, reviews, books, booksStatus) => ({
        reviews: reviews.filter(review => (review.createdBy == currentUser.id)),
        books: books,
        fetchingBooks: booksStatus.fetchingBooks
    })
);