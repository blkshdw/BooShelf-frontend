import {
    createDeepEqualSelector,
        entitiesArraySelector,
        statusSelector,
        entitiesSelector,
        currentUserSelector
} from './common';

export const myTrackingsSelector = createDeepEqualSelector(
    [currentUserSelector, entitiesArraySelector('trackings')],
    (currentUser, trackings) => trackings.filter(tracking => {
        return tracking.createdBy === currentUser.id
    })
);

export const myTrackingsContentSelector = createDeepEqualSelector(
    [myTrackingsSelector, entitiesSelector('books'), statusSelector('books'), statusSelector('trackings')],
    (myTrackings, books, booksStatus, trackingsStatus) => ({
        books: books,
        trackings: myTrackings,
        error: booksStatus.error,
        isFetching: trackingsStatus.isFetching,
        fetchingBooks: booksStatus.fetchingBooks
    })
)