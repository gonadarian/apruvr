/* @flow */
import type { GetState } from '../reducers';

export const ROUTE_CHANGE = 'ROUTE_CHANGE';
export const FETCH_NODES = 'FETCH_NODES';
export const EXPORT_NODES = 'EXPORT_NODES';
export const FILTER_VISIBIITY = 'FILTER_VISIBIITY';
export const FIREBASE_WORKFLOW = 'FIREBASE_WORKFLOW';
export const FIREBASE_AUTH = 'FIREBASE_AUTH';
export const FIREBASE_ROLES = 'FIREBASE_ROLES';
export const FIREBASE_USERS = 'FIREBASE_USERS';
export const FIREBASE_HISTORY = 'FIREBASE_HISTORY';
export const FIREBASE_DURATIONS = 'FIREBASE_DURATIONS';
export const PAGE_EXPAND = 'PAGE_EXPAND';

const actions = {
    ROUTE_CHANGE,
    FETCH_NODES,
    EXPORT_NODES,
    FILTER_VISIBIITY,
    FIREBASE_WORKFLOW,
    FIREBASE_AUTH,
    FIREBASE_ROLES,
    FIREBASE_USERS,
    FIREBASE_HISTORY,
    FIREBASE_DURATIONS,
    PAGE_EXPAND,
};

type ActionType = $Keys<typeof actions>;

export type Action = { type: ActionType, payload: boolean | string | ?Object };
export type PromiseAction = Promise<Action>;
type DispatchInner = (action: Action | PromiseAction | Array<Action>) => any;
export type ThunkAction = (dispatch: DispatchInner, getState: GetState) => any;
export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
