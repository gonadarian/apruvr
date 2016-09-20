import handleReducers from './handler';
import { FILTER_TOPIC } from '../actions/index';

const handlers = {
    [FILTER_TOPIC]: (state, action) => action.payload,
};

export default (state = 'root.math', action) =>
    handleReducers(handlers, state, action);
