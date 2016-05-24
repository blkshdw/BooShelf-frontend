import {
    createDeepEqualSelector,
    entitiesArraySelector,
    statusSelector,
    routerParamSelector,
    entitiesSelector,
    currentUserSelector
} from './common';

import { myTrackingsSelector } from './trackings';

import { myReviewsSelector } from './reviews';

export const filteredBooksSelector = createDeepEqualSelector(
    [entitiesArraySelector('books'), statusSelector('books')],
    (books, booksStatus) => {
        const {currentFilterAuthor, currentFilterTitle, currentFilterGenre} = booksStatus;
        return books.filter(book => {
            if (currentFilterTitle) {
                if (!book.title) {
                    return false
                }
                try {
                    if (!book.title.toLocaleLowerCase().includes(currentFilterTitle.toLocaleLowerCase()) && !book.title.match(currentFilterTitle)) {
                        return false
                    }
                } catch(e) {
                    return false
                }

            }
            if (currentFilterAuthor) {
                if (!book.author) {
                    return false
                }
                try {
                    if (!book.author.toLocaleLowerCase().includes(currentFilterAuthor.toLocaleLowerCase()) && !book.author.match(currentFilterAuthor)) {
                        return false
                    }
                } catch(e) {
                    return false
                }

            }
            if (currentFilterGenre) {
                if (book.genre !== currentFilterGenre) {
                    return false
                }
            }
            return true
        })
    }
)

export const booksListSelector = createDeepEqualSelector(
    [filteredBooksSelector, statusSelector('books')],
    (filteredBooks, booksStatus) => ({
        books: filteredBooks,
        booksStatus: booksStatus
    })
);

export const myTrackingForBookSelector = createDeepEqualSelector(
    [myTrackingsSelector, routerParamSelector('bookId')],
    (myTrackings, bookId) => myTrackings.filter(tracking => {
        return tracking.book === bookId
    })[0]
)

export const reviewsForBookSelector = createDeepEqualSelector(
    [entitiesArraySelector('reviews'), routerParamSelector('bookId')],
    (reviews, bookId) => reviews.filter(review => review.book === bookId)
);

export const myReviewForBookSelector = createDeepEqualSelector(
    [myReviewsSelector, routerParamSelector('bookId')],
    (myReviews, bookId) => myReviews.filter(review => review.book === bookId)[0]
)

export const bookCardSelector = createDeepEqualSelector(
    [entitiesSelector('books'), currentUserSelector, routerParamSelector('bookId'), statusSelector('books'), myTrackingForBookSelector, statusSelector('trackings'), reviewsForBookSelector, entitiesSelector('users'), statusSelector('reviews'), myReviewForBookSelector, statusSelector('users')],
    (books, currentUser, bookId, booksStatus, myTrackingForBook, trackingsStatus, reviews, users, reviewsStatus, myReviewForBook, usersStatus) => ({
        book: books[bookId],
        bookId: bookId,
        isFetching: booksStatus.isFetching,
        isUpdating: booksStatus.isUpdating,
        reviews: reviews,
        users: users,
        fetchingUsers: usersStatus.fetchingUsers,
        isUpdatingReview: reviewsStatus.isUpdating,
        inMyCollection: myTrackingForBook ? true : false,
        myTracking: myTrackingForBook,
        myReview: myReviewForBook,
        isUpdatingTracking: trackingsStatus.isUpdating,
        editable: books[bookId] ? books[bookId].createdBy === currentUser.id : false
    })
)