import { CHANGE_LANGUAGE } from '../actions/types';
import handleReducers from './handler';

const handlers = {
    // language has been chosen
    [CHANGE_LANGUAGE]: (state, action) => action.payload,
};

export default (state = null, action) =>
    handleReducers(handlers, state, action);
