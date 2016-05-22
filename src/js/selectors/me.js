import {
    createDeepEqualSelector,
    entitiesArraySelector,
    statusSelector,
    currentUserSelector
} from './common';

export const myProfileSelector = createDeepEqualSelector(
    [currentUserSelector, statusSelector('users')],
    (currentUser, usersStatus) => ({
        user: currentUser,
        error: usersStatus.error,
        isUpdating: usersStatus.isUpdating
    })
);