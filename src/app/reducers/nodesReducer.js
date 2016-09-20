import handleReducers from './handler';
import { CHANGE_LANGUAGE, FETCH_NODES } from '../actions/index';

const handlers = {
    [CHANGE_LANGUAGE]:  () => null,
    [FETCH_NODES]:      (state, action) => action.payload.data.nodes,
};

export default (state = null, action) =>
    handleReducers(handlers, state, action);
