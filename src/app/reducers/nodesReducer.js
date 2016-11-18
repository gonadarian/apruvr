import { CHANGE_LANGUAGE, FETCH_NODES } from '../actions/types';
import handleReducers from './handler';

const handlers = {
    // language was changed so all translation data is removed
    [CHANGE_LANGUAGE]:  () => null,
    // translation data has been fetched
    [FETCH_NODES]:      (state, action) => action.payload.data.nodes,
};

export default (state = null, action) =>
    handleReducers(handlers, state, action);
