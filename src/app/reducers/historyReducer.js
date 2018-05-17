/* @flow */
import { FIREBASE_HISTORY } from '../actions/types';
import handleReducers, { type Handlers } from './handler';
import type { Action, HistoryType } from '../flows';

const handlers: Handlers<?HistoryType> = {
    [FIREBASE_HISTORY]: (state, { payload: { slug, snapshot } }) => ({
        slug,
        timeline: snapshot
            ? snapshot.val()
            : null,
    }),
};

export default (state: ?HistoryType = null, action: Action) =>
    handleReducers(handlers, state, action);
