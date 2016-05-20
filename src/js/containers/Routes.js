import React from 'react';
import store from '../store';
import { userIsLoggedInSelector } from 'selectors';
import { Route, Redirect } from 'react-router';
import Main from './Main';
import Login from './Login';
import Logout from './Logout';
import AnonymousApp from './AnonymousApp';
import AuthenticatedApp from './AuthenticatedApp';
import NotFound from 'components/NotFound';
import { UserCardBooksContent, UserCardContent, UsersListContent } from './users';
import { MeContent, MyBooks, MyReviews } from './me';
import { BookCardContent, BooksContent } from './books';


function requireAuth(nextState, replaceState) {
    if (!userIsLoggedInSelector(store.getState())) {
        replaceState({ 
            nextPathname: [
                nextState.location.pathname, 
                nextState.location.search
            ].join('') 
        }, '/login');
    }
}

function requireNotLoggedIn(nextState, replaceState) {
    if (userIsLoggedInSelector(store.getState())) {
        replaceState(null, '/me');
    }
}

export default (
    <Route>
        <Redirect from="/" to="/me" />
        <Route component={AnonymousApp}>
            <Route path="login" component={Login} onEnter={requireNotLoggedIn} />
            <Route path="logout" component={Logout} />
        </Route>
        <Route component={AuthenticatedApp} onEnter={requireAuth} ignoreScrollBehavior>
            <Route component={Main}>
                <Redirect from="me" to="/me/reviews"/>
                <Route path="me" components={{ content: MeContent}} >
                    <Route path="reviews" component={MyReviews} />
                    <Route path="books/:bookType" component={MyBooks} />
                </Route>
                <Route path="books" components={{ content: BooksContent }} />
                <Route path="books/:bookId" components={{ content: BookCardContent }} />
                <Route path="users" components={{ content: UsersListContent }} />
                <Route path="users/:userId" components={{ content: UserCardContent }} />
                <Route path="users/:userId/books" components={{content: UserCardBooksContent}} />
            </Route>
        </Route>
        <Route path="*" component={NotFound} />
    </Route>
);
