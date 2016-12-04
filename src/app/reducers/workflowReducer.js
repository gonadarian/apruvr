import { FIREBASE_WORKFLOW } from '../actions/types';
import handleReducers from './handler';

const handlers = {
    // workflow information has been fetched
    [FIREBASE_WORKFLOW]: (state, { payload }) => payload.val(),
};

export default (state = null, action) =>
    handleReducers(handlers, state, action);
