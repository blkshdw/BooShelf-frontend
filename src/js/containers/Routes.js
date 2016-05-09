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
import { ChannelsContent } from './channels';
import { TicketsContent } from './tickets';
import { PeopleContent } from './people';
import { StatisticsContent } from './statistics';

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
        replaceState(null, '/channels');
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
                <Route path="me" />
                <Route path="books" components={{ content: ChannelsContent }} />
                <Route path="books/:bookId" components={{ content: ChannelsContent }} />
                <Route path="users" components={{ content: PeopleContent }} />
                <Route path="users/:userId" components={{ content: PeopleContent }} />
                <Route path="users/:userId/books" components={{content: PeopleContent}} />
                <Route path="reviews" components={{content: PeopleContent}} />
            </Route>
        </Route>
        <Route path="*" component={NotFound} />
    </Route>
);
