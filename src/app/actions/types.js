/* @flow */
import type { GetState } from '../reducers';

export const ROUTE_CHANGE = 'ROUTE_CHANGE';
export const FETCH_NODES = 'FETCH_NODES';
export const FILTER_VISIBIITY = 'FILTER_VISIBIITY';
export const FIREBASE_WORKFLOW = 'FIREBASE_WORKFLOW';
export const FIREBASE_AUTH = 'FIREBASE_AUTH';
export const FIREBASE_ROLES = 'FIREBASE_ROLES';
export const FIREBASE_USERS = 'FIREBASE_USERS';
export const FIREBASE_HISTORY = 'FIREBASE_HISTORY';

type Action = any;

type PromiseAction = Promise<Action>;
type DispatchInner = (action: Action | PromiseAction | Array<Action>) => any;
type ThunkAction = (dispatch: DispatchInner, getState: GetState) => any;
type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;

export type {
    Action,
    Dispatch,
};
