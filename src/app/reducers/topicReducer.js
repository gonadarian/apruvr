import { FILTER_TOPIC } from '../actions/types';
import handleReducers from './handler';

const handlers = {
    // topic has been chosen
    [FILTER_TOPIC]: (state, action) => action.payload,
};

export default (state = 'root.math', action) =>
    handleReducers(handlers, state, action);
