import { ROUTE_CHANGE } from '../actions/types';
import handleReducers from './handler';

const INITIAL_VALUE = 'root.math';

const handlers = {
    [ROUTE_CHANGE]: (state, { payload }) => {
        if ('topic' in payload) {
            // topic has been chosen or cleared
            return state === payload.topic
                ? state
                : (payload.topic || INITIAL_VALUE);
        }
        return state;
    },
};

export default (state = INITIAL_VALUE, action) =>
    handleReducers(handlers, state, action);
