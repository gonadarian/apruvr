import { isEqual } from 'lodash';
import { languageLookup } from '../consts';
import { ROUTE_CHANGE } from '../actions/types';
import handleReducers from './handler';

const INITIAL_VALUE = null;

const handlers = {
    [ROUTE_CHANGE]: (state, { payload }) => {
        if ('lang' in payload) {
            // language has been chosen or cleared
            const language = languageLookup(payload.lang);
            return isEqual(state, language) ? state : (language || INITIAL_VALUE);
        }
        return state;
    },
};

export default (state = INITIAL_VALUE, action) =>
    handleReducers(handlers, state, action);
