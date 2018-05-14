/* @flow */
import { mapValues } from 'lodash';
import { iif } from '../utils';
import { FILTER_VISIBIITY } from '../actions/types';
import handleReducers, { type Handlers } from './handler';
import type { Action } from '../flows';
import type { VisibilityListType } from '../consts';

const INITIAL_VALUE = {
    fresh:      true,
    doing:      true,
    translated: true,
    approved:   true,
    subtitled:  true,
    dubbed:     true,
};

const handlers: Handlers<VisibilityListType> = {
    // one of the visiblity filters has been switched
    [FILTER_VISIBIITY]: (state, { payload }) =>
        mapValues(
            state,
            (visible, key) => iif(key === payload, !visible, visible),
        ),
};

export default (state: VisibilityListType = INITIAL_VALUE, action: Action) =>
    handleReducers(handlers, state, action);
