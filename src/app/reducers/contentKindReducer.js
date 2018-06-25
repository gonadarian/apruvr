/* @flow */
import { isEqual } from 'lodash';
import { ROUTE_CHANGE } from '../actions/types';
import { DEFAULT_CONTENT_KIND, contentKindLookup, type ContentKindType } from '../consts';
import handleReducers, { type Handlers } from './handler';
import type { Action } from '../flows';

const INITIAL_VALUE = DEFAULT_CONTENT_KIND;

const handlers: Handlers<ContentKindType> = {
    [ROUTE_CHANGE]: (state, { payload }) => {
        if ('kind' in payload) {
            // content kind filter has been selected
            const contentKind = contentKindLookup(payload.kind);
            return isEqual(state, contentKind)
                ? state
                : (contentKind || INITIAL_VALUE);
        }
        return state;
    },
};

export default (state: ContentKindType = INITIAL_VALUE, action: Action) =>
    handleReducers(handlers, state, action);
