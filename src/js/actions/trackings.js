import { CALL_API, Schemas } from 'middleware/api'
import {
    UPDATE_TRACKING,
    UPDATE_TRACKING_SUCCESS,
    UPDATE_TRACKING_ERROR,

    FETCH_TRACKINGS,
    FETCH_TRACKINGS_SUCCESS,
    FETCH_TRACKINGS_ERROR,

    FETCH_TRACKING,
    FETCH_TRACKING_SUCCESS,
    FETCH_TRACKING_ERROR,

    CREATE_TRACKING,
    CREATE_TRACKING_SUCCESS,
    CREATE_TRACKING_ERROR,

    REMOVE_TRACKING,
    REMOVE_TRACKING_SUCCESS,
    REMOVE_TRACKING_ERROR
}  from 'constants';


export function updateTracking(trackingId, values) {
    return {
        [CALL_API]: {
            types: [
                UPDATE_TRACKING,
                UPDATE_TRACKING_SUCCESS,
                UPDATE_TRACKING_ERROR
            ],
            method: 'PUT',
            endpoint: '/trackings/' + trackingId,
            data: values,
            schema: Schemas.TRACKING
        },
        meta: { values }
    };
}

export function createTracking(values) {
    return {
        [CALL_API]: {
            types: [
                CREATE_TRACKING,
                CREATE_TRACKING_SUCCESS,
                CREATE_TRACKING_ERROR
            ],
            method: 'POST',
            endpoint: '/trackings',
            data: values,
            schema: Schemas.TRACKING
        },
        meta: { values }
    };
}

export function fetchTracking(trackingId) {
    return {
        [CALL_API]: {
            types: [
                FETCH_TRACKING,
                FETCH_TRACKING_SUCCESS,
                FETCH_TRACKING_ERROR
            ],
            method: 'GET',
            endpoint: '/trackings/' + trackingId,
            data: values,
            schema: Schemas.TRACKING
        },
        meta: { values }
    };
}

export function fetchMyTrackings(values) {
    return {
        [CALL_API]: {
            types: [
                FETCH_TRACKINGS,
                FETCH_TRACKINGS_SUCCESS,
                FETCH_TRACKINGS_ERROR
            ],
            method: 'GET',
            endpoint: '/me/' + 'trackings',
            data: values,
            schema: Schemas.TRACKING_ARRAY
        },
        meta: { values }
    };
}

export function fetchUserTrackings(userId) {
    return {
        [CALL_API]: {
            types: [
                FETCH_TRACKINGS,
                FETCH_TRACKINGS_SUCCESS,
                FETCH_TRACKINGS_ERROR
            ],
            method: 'GET',
            endpoint: '/users/' + userId + 'trackings',
            data: values,
            schema: Schemas.TRACKING_ARRAY
        },
        meta: { values }
    };
}

export function deleteTracking(trackingId) {
    return {
        [CALL_API]: {
            types: [
                REMOVE_TRACKING,
                REMOVE_TRACKING_SUCCESS,
                REMOVE_TRACKING_ERROR
            ],
            method: 'DELETE',
            endpoint: '/trackings/' + trackingId
        },
        meta: { trackingId }
    };
}