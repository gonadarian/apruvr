/* @flow */
import { FIREBASE_AUTH } from '../actions/types';
import handleReducers, { type Handlers } from './handler';
import type { Action, UserType } from '../flows';

const handlers: Handlers<?UserType> = {
    [FIREBASE_AUTH]: (state, { payload }) => payload,
};

export default (state: ?UserType = null, action: Action) =>
    handleReducers(handlers, state, action);
