import { isEqual } from 'lodash';
import { ROUTE_CHANGE } from '../actions/types';
import { contentKindLookup } from '../consts';
import handleReducers from './handler';

const INITIAL_VALUE = contentKindLookup('exercises');

const handlers = {
    [ROUTE_CHANGE]: (state, { payload }) => {
        if ('kind' in payload) {
            // content kind filter has been selected
            const contentKind = contentKindLookup(payload.kind);
            return isEqual(state, contentKind) ? state : (contentKind || INITIAL_VALUE);
        }
        return state;
    },
};

export default (state = INITIAL_VALUE, action) =>
    handleReducers(handlers, state, action);
