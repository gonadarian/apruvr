import handleReducers from './handler';
import { CHANGE_LANGUAGE, FETCH_NODES } from '../actions/index';

const handlers = {
    [CHANGE_LANGUAGE]:  () => true,
    [FETCH_NODES]:      () => false,
};

export default (state = false, action) =>
    handleReducers(handlers, state, action);
