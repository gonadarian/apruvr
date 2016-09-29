import { CHANGE_LANGUAGE, FETCH_NODES } from '../actions/types';
import handleReducers from './handler';

const handlers = {
    [CHANGE_LANGUAGE]:  () => true,
    [FETCH_NODES]:      () => false,
};

export default (state = false, action) =>
    handleReducers(handlers, state, action);
