import { ROUTE_CHANGE, FETCH_NODES } from '../actions/types';
import handleReducers from './handler';

const handlers = {
    // language was changed so all translation data is removed
    [ROUTE_CHANGE]: (state, { payload }) => 'lang' in payload
        ? null
        : state,
    // translation data has been fetched
    [FETCH_NODES]: (state, { payload }) => payload
        ? payload.data.nodes
        : null,
};

export default (state = null, action) =>
    handleReducers(handlers, state, action);
