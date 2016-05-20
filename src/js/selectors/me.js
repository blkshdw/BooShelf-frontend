import {
    createDeepEqualSelector,
    entitiesArraySelector,
    statusSelector,
    currentUserSelector
} from './common';

export const myProfileSelector = createDeepEqualSelector(
    [currentUserSelector],
    (currentUser) => ({
        user: currentUser
    })
);