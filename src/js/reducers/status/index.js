import auth from './auth';
import app from './app';
import ready from './ready';
import books from './books';
import reviews from './reviews';
import trackings from './trackings';
import users from './users';
import intl from './intl';
import { combineReducers } from 'redux';

export default combineReducers({
    auth,
    app,
    ready,
    trackings,
    books,
    users,
    reviews,
    intl
});
