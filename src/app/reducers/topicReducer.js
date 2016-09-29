import { FILTER_TOPIC } from '../actions/types';
import handleReducers from './handler';

const handlers = {
    [FILTER_TOPIC]: (state, action) => action.payload,
};

export default (state = 'root.math', action) =>
    handleReducers(handlers, state, action);
