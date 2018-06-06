/* @flow */
import { isEmpty } from 'lodash';
import { ROUTE_CHANGE, FETCH_NODES } from '../actions/types';
import handleReducers, { type Handlers } from './handler';
import type { Action } from '../flows';

const INITIAL_VALUE = false;

const handlers: Handlers<boolean> = {
    // show loading indicator when language is chosen, as resources are loading
    [ROUTE_CHANGE]: (state, { payload }) => 'lang' in payload && !isEmpty(payload.lang),
    // translation data was fetched, remove the loading indicator
    [FETCH_NODES]:  () => false,
};

export default (state: boolean = INITIAL_VALUE, action: Action) =>
    handleReducers(handlers, state, action);
