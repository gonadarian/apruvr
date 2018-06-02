/* @flow */
import { FIREBASE_DURATIONS } from '../actions/types';
import handleReducers, { type Handlers } from './handler';
import type { Action, DurationsType } from '../flows';

const handlers: Handlers<?DurationsType> = {
    [FIREBASE_DURATIONS]: (state, { payload }) => payload,
};

export default (state: ?DurationsType = null, action: Action) =>
    handleReducers(handlers, state, action);
