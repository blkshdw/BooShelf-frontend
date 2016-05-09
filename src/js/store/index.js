import reducer from 'reducers';
import thunkMiddleware from 'redux-thunk';
import combineActions from 'redux-combine-actions';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';
import createHistory from 'history/lib/createBrowserHistory';
import { promiseMiddleware, apiMiddleware, socketMiddleware } from 'middleware';
let finalCreateStore;

if (process.env.NODE_ENV === 'development') {
    finalCreateStore = compose(
        applyMiddleware(thunkMiddleware, combineActions, apiMiddleware, promiseMiddleware, socketMiddleware, createLogger({collapsed: true})),
        reduxReactRouter({ createHistory }),
        require('containers/DevTools').instrument(),
        require('redux-devtools').persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore);
} else {
    finalCreateStore = compose(
        applyMiddleware(thunkMiddleware, combineActions, apiMiddleware, promiseMiddleware, socketMiddleware),
        reduxReactRouter({ createHistory }),
    )(createStore);
}

const store = finalCreateStore(reducer, {});

if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
        const nextRootReducer = require('../reducers/index');
        store.replaceReducer(nextRootReducer);
    });
}

if (process.env.NODE_ENV === 'development') {
    const actions = require('actions');
    const { bindActionCreators } = require('redux');

    window.actions = bindActionCreators(actions, store.dispatch);
}

export default store;
