import { FIREBASE_ROLES } from '../actions/types';
import handleReducers from './handler';

const handlers = {
    [FIREBASE_ROLES]: (state, action) => action.payload.val(),
};

export default (state = null, action) =>
    handleReducers(handlers, state, action);
