import { CHANGE_LANGUAGE, FETCH_NODES } from '../actions/types';
import handleReducers from './handler';

const handlers = {
    [CHANGE_LANGUAGE]:  () => null,
    [FETCH_NODES]:      (state, action) => action.payload.data.nodes,
};

export default (state = null, action) =>
    handleReducers(handlers, state, action);
