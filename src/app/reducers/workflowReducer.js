/* @flow */
import { FIREBASE_WORKFLOW } from '../actions/types';
import handleReducers, { type Handlers } from './handler';
import type { Action, WorkflowMapType } from '../flows';

const handlers: Handlers<?WorkflowMapType> = {
    // workflow information has been fetched
    [FIREBASE_WORKFLOW]: (state, { payload }) => payload.val(),
};

export default (state: ?WorkflowMapType = null, action: Action) =>
    handleReducers(handlers, state, action);
