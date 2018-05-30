/* @flow */
import { ROUTE_CHANGE, PAGE_EXPAND } from '../actions/types';
import handleReducers, { type Handlers } from './handler';
import type { Action } from '../flows';

const INITIAL_VALUE = 50;

const handlers: Handlers<?number> = {
    // show loading indicator when language is chosen, as resources are loading
    [ROUTE_CHANGE]: () => INITIAL_VALUE,
    // translation data was fetched, remove the loading indicator
    [PAGE_EXPAND]:  (state, { payload }) =>
        payload
            ? null
            : state + INITIAL_VALUE,
};

export default (state: number = INITIAL_VALUE, action: Action) =>
    handleReducers(handlers, state, action);
