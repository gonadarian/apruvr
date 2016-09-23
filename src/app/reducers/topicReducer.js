import handleReducers from './handler';
import { FILTER_TOPIC } from '../actions/types';

const handlers = {
    [FILTER_TOPIC]: (state, action) => action.payload,
};

export default (state = 'root.math', action) =>
    handleReducers(handlers, state, action);
