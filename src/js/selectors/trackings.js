import {
    createDeepEqualSelector,
        entitiesArraySelector,
        statusSelector,
        routerParamSelector,
        entitiesSelector,
        currentUserSelector
} from './common';

export const trackingsTypeSelector = createDeepEqualSelector(
    [entitiesArraySelector('trackings'), routerParamSelector('trackingType')],
    (trackings, type) => {
        switch (type) {
            case 'all':
                return trackings;
            case 'toRead':
                return trackings.filter(tracking => tracking.status == 0);
            case 'inProgress':
                return trackings.filter(tracking => tracking.status == 1);
            case 'finished':
                return trackings.filter(tracking => tracking.status == 2);
            default:
                return trackings
        }
    }
);

export const myTrackingsSelector = createDeepEqualSelector(
    [currentUserSelector, trackingsTypeSelector],
    (currentUser, trackings) => trackings.filter(tracking => {
        return tracking.createdBy === currentUser.id
    })
);

export const userTrackingsSelector = createDeepEqualSelector(
    [routerParamSelector('userId'), trackingsTypeSelector],
    (userId, trackings) => trackings.filter(tracking => {
        return tracking.createdBy === userId
    })
);

export const userProgressSelector = createDeepEqualSelector(
    [entitiesArraySelector('trackings'), routerParamSelector('userId')],
    (trackings, userId) => {
        const userTrackings = trackings.filter(tracking => tracking.createdBy === userId);
        let progress = 0;
        userTrackings.forEach(tracking => {
            if (tracking.status !== 2) {
                progress = progress + Math.round(tracking.pagesRead ? (tracking.pagesRead / tracking.pagesCount) * 100 : 0)
            } else {
                progress += 100
            }
        });
        return Math.round(progress/userTrackings.length);
    }

);


export const userTrackingsContentSelector = createDeepEqualSelector(
    [userTrackingsSelector, entitiesSelector('books'), statusSelector('books'), routerParamSelector('trackingType'), statusSelector('trackings'), userProgressSelector],
    (myTrackings, books, booksStatus, type, trackingsStatus, progress) => ({
        books: books,
        trackings: myTrackings,
        type: type,
        progress: progress,
        isUpdating: trackingsStatus.isUpdating,
        error: booksStatus.error,
        isFetching: trackingsStatus.isFetching,
        fetchingBooks: booksStatus.fetchingBooks
    })
);

export const myProgressSelector = createDeepEqualSelector(
    [entitiesArraySelector('trackings'), currentUserSelector],
    (trackings, user) => {
        const myTrackings = trackings.filter(tracking => tracking.createdBy === user.id);
        let progress = 0;
        myTrackings.forEach(tracking => {
            if (tracking.status !== 2) {
                progress = progress + Math.round(tracking.pagesRead ? (tracking.pagesRead / tracking.pagesCount) * 100 : 0)
            } else {
                progress += 100
            }
        });
        return Math.round(progress/myTrackings.length);
    }

)


export const myTrackingsContentSelector = createDeepEqualSelector(
    [myTrackingsSelector, entitiesSelector('books'), statusSelector('books'), routerParamSelector('trackingType'), statusSelector('trackings'), myProgressSelector],
    (myTrackings, books, booksStatus, type, trackingsStatus, progress) => ({
        books: books,
        trackings: myTrackings,
        type: type,
        progress: progress,
        isUpdating: trackingsStatus.isUpdating,
        error: booksStatus.error,
        isFetching: trackingsStatus.isFetching,
        fetchingBooks: booksStatus.fetchingBooks
    })
)