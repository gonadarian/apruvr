/* @flow */
import { ROUTE_CHANGE, FETCH_NODES } from '../actions/types';
import handleReducers, { type Handlers } from './handler';
import type { Action, NodeMapType } from '../flows';

const handlers: Handlers<?NodeMapType> = {
    // language was changed so all translation data is removed
    [ROUTE_CHANGE]: (state, { payload }) => 'lang' in payload
        ? null
        : state,
    // translation data has been fetched
    [FETCH_NODES]: (state, { payload }) => payload
        ? payload.data.nodes
        : null,
};

export default (state: ?NodeMapType = null, action: Action) =>
    handleReducers(handlers, state, action);
