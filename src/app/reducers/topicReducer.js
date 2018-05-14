/* @flow */
import { ROUTE_CHANGE } from '../actions/types';
import handleReducers, { type Handlers } from './handler';
import type { Action } from '../flows';

const INITIAL_VALUE = 'root.math';

const handlers: Handlers<string> = {
    [ROUTE_CHANGE]: (state, { payload }) => {
        if ('topic' in payload) {
            // topic has been chosen or cleared
            return state === payload.topic
                ? state
                : (payload.topic || INITIAL_VALUE);
        }
        return state;
    },
};

export default (state: string = INITIAL_VALUE, action: Action) =>
    handleReducers(handlers, state, action);
