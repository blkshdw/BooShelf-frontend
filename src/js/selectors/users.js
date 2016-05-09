import {
    createDeepEqualSelector,
    entitiesArraySelector,
    statusSelector,
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
    (filteredUsers, usersStatus) => ({
        users: filteredUsers,
        isFetching: usersStatus.isFetching
    })
);
