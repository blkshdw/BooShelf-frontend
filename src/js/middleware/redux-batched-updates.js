import { unstable_batchedUpdates as batchedUpdates } from 'react-dom';  // eslint-disable-line camelcase

export default function batchedUpdatesMiddleware() {
    return next => action => batchedUpdates(() => next(action));
}
