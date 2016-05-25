import {
    createDeepEqualSelector,
    entitiesArraySelector,
    statusSelector,
    entitiesSelector,
    routerParamSelector,
    currentUserSelector
} from './common';

export const filteredUsersSelector = createDeepEqualSelector(
    [entitiesArraySelector('users')],
    (usersArray) => {

        return usersArray
            .filter(user => {
                if (user._deleted) {
                    return false;
                }
                return true;
            });
    }
);


export const usersListSelector = createDeepEqualSelector(
    [filteredUsersSelector, statusSelector('users')],
    (filteredUsers, usersStatus, userId) => ({
        users: filteredUsers,
        isFetching: usersStatus.isFetching
    })
);

export const userCardSelector = createDeepEqualSelector(
    [entitiesSelector('users'), statusSelector('users'), routerParamSelector('userId'), currentUserSelector],
    (users, usersStatus, userId, currentUser) => ({
        user: users[userId],
        userId: userId,
        isMe: currentUser.id === userId,
        isFetching: usersStatus.isFetching
    })
);
