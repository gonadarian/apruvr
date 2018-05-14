/* @flow */
import { isEqual } from 'lodash';
import { languageLookup, type LanguageType } from '../consts';
import { ROUTE_CHANGE } from '../actions/types';
import handleReducers, { type Handlers } from './handler';
import type { Action } from '../flows';

const INITIAL_VALUE = null;

const handlers: Handlers<?LanguageType> = {
    [ROUTE_CHANGE]: (state, { payload }) => {
        if ('lang' in payload) {
            // language has been chosen or cleared
            const language = languageLookup(payload.lang);
            return isEqual(state, language)
                ? state
                : (language || INITIAL_VALUE);
        }
        return state;
    },
};

export default (state: ?LanguageType = INITIAL_VALUE, action: Action) =>
    handleReducers(handlers, state, action);
