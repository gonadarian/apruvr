/* @flow */
import { FIREBASE_ROLES, FIREBASE_AUTH } from '../actions/types';
import handleReducers, { type Handlers } from './handler';
import type { Action } from '../flows';

const handlers: Handlers<?string> = {
    // roles have been fetched from backend
    [FIREBASE_ROLES]: (state, { payload }) => payload,
    // if user has logged out then remove roles data
    [FIREBASE_AUTH]:  (state, { payload }) => payload
        ? state
        : null,
};

export default (state: ?string = null, action: Action) =>
    handleReducers(handlers, state, action);
