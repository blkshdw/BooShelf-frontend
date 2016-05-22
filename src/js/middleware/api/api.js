import config from 'config';
import { normalize } from 'normalizr';
import Request from './request' ;
import { currentUserSelector } from 'selectors';
import { TYPE_JSON, TYPE_PLAIN } from 'constants/Common';

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API');

const X_USER_DEVICE_HEADER = 'web';

const request = (acceptedType, token) => new Request({
    path: `${config.api.host}`,
    headers: {
        'Accept': acceptedType,
        'Token': token
    }
});

const requestEnum = {
    GET: (path, data, query, acceptedType, token) => request(acceptedType, token).setType('GET').setPath(path).setQuery(query).setBody(data).fetch(),
    PUT: (path, data, query, acceptedType, token) => request(acceptedType, token).setType('PUT').setPath(path).setQuery(query).setBody(data).setHeaders(data).fetch(),
    PATCH: (path, data, query, acceptedType, token) => request(acceptedType, token).setType('PUT').setPath(path).setQuery(query).setBody(data).setHeaders(data).fetch(),
    POST: (path, data, query, acceptedType, token) => request(acceptedType, token).setType('POST').setPath(path).setQuery(query).setBody(data).setHeaders(data).fetch(),
    DELETE: (path, data, query, acceptedType, token) => request(acceptedType, token).setType('DELETE').setPath(path).setQuery(query).setBody(data).setHeaders(data).fetch()
};

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.

function callApi(method, endpoint, data, query, schema, acceptedType, token) {
    const req = requestEnum[method];
    switch (acceptedType) {
        case TYPE_JSON:
            if (!schema) return req(endpoint, data, query, acceptedType, token);
            return req(endpoint, data, query, acceptedType, token).then(response => normalize(response, schema));
        case TYPE_PLAIN:
            return req(endpoint, data, query, acceptedType, token);
        default:
            return new Error(`Case ${acceptedType} is not specified in function callApi.`);
    }
}

function parseEndpoint(state, endpoint) {
    let parsedEndpoint = endpoint;

    if (endpoint.includes(':username')) {
        const username = currentUsernameSelector(state);
        if (!username) {
            throw new Error('Can not resolve username variable in', endpoint, 'endpoint.');
        }
        parsedEndpoint = endpoint.replace(':username', username);
    }

    if (endpoint.includes(':me')) {
        const username = myUsernameSelector(state);
        if (!username) {
            throw new Error('Can not resolve username variable in', endpoint, 'endpoint.');
        }
        parsedEndpoint = endpoint.replace(':me', username);
    }

    return parsedEndpoint;
}

export default store => next => action => {
    const callAPI = action[CALL_API];
    if (typeof callAPI === 'undefined') {
        return next(action);
    }

    let { method, endpoint, acceptedType } = callAPI;
    const { schema, types, data, query } = callAPI;

    if (!method) {
        method = 'GET';
    }
    if (typeof endpoint === 'function') {
        endpoint = endpoint(store.getState());
    }

    if (!acceptedType) {
        acceptedType = 'application/json';
    }

    let {status: { auth: { token }} } =  store.getState();

    if (typeof method !== 'string') {
        throw new Error('Specify a string method type.');
    }
    if (!Object.keys(requestEnum).some(key => key === method)) {
        throw new Error('Expected method type to be one of ' + Object.keys(requestEnum) + ' types.');
    }
    if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL.');
    }
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.');
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.');
    }
    if (typeof acceptedType !== 'string') {
        throw new Error('Specify a string acceptedType type.');
    }

    function actionWith(data, query) {
        const finalAction = Object.assign({}, action, data, query);
        delete finalAction[CALL_API];
        return finalAction;
    }

    const [ requestType, successType, failureType ] = types;
    next(actionWith({ type: requestType }));

    return callApi(method, endpoint, data, query, schema, acceptedType, token).then(
        response => next(actionWith({
            payload: response,
            type: successType
        })),
        error => next(actionWith({
            type: failureType,
            error: error || 'Something bad happened'
        }))
    );
};
