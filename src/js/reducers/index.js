import status from './status';
import entities from './entities';
import { routerStateReducer as router } from 'redux-router';
import { combineReducers } from 'redux';

export default combineReducers({
    router,
    status,
    entities
});
