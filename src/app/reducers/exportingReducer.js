/* @flow */
import { EXPORT_NODES, ROUTE_CHANGE, FILTER_VISIBIITY } from '../actions/types';
import handleReducers, { type Handlers } from './handler';
import type { Action } from '../flows';

const handlers: Handlers<boolean> = {
    // whether report generation for export should start
    [EXPORT_NODES]:     (state, { payload }) => payload,
    // if route changes or filter changes, we shold request new report to be generated
    [ROUTE_CHANGE]:     () => false,
    [FILTER_VISIBIITY]: () => false,
};

export default (state: boolean = false, action: Action) =>
    handleReducers(handlers, state, action);
