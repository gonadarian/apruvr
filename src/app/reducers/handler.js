/* @flow */
import type { Action } from '../flows';

type Handlers<T> = { [string]: (T, any) => T };

const handleReducers = <T>(handlers: Handlers<T>, state: T, action: Action): T =>
    action.type in handlers
        ? handlers[action.type](state, action)
        : state;

export type {
    Handlers,
};

export default handleReducers;
