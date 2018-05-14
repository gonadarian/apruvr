/* @flow */
import { FIREBASE_USERS } from '../actions/types';
import handleReducers, { type Handlers } from './handler';
import type { Action, UserType } from '../flows';

const handlers: Handlers<?UserType[]> = {
    // list of all the users has been fetched
    [FIREBASE_USERS]: (state, { payload }) => payload.val(),
};

export default (state: ?UserType[] = null, action: Action) =>
    handleReducers(handlers, state, action);
