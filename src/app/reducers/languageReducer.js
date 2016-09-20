import handleReducers from './handler';
import { CHANGE_LANGUAGE } from '../actions/index';

const handlers = {
    [CHANGE_LANGUAGE]: (state, action) => action.payload,
};

export default (state = null, action) =>
    handleReducers(handlers, state, action);
