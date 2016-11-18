import { FIREBASE_USERS } from '../actions/types';
import handleReducers from './handler';

const handlers = {
    // list of all the users has been fetched
    [FIREBASE_USERS]: (state, action) => action.payload.val(),
};

export default (state = null, action) =>
    handleReducers(handlers, state, action);
