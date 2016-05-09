import { combineEntitiesReducers } from 'redux-entities';
import users from './users';
import books from './books';
import reviews from './reviews';
import trackings from './trackings';

export default combineEntitiesReducers({
    users,
    books,
    reviews,
    trackings
});
