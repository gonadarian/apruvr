import { FIREBASE_ROLES, FIREBASE_AUTH } from '../actions/types';
import handleReducers from './handler';

const handlers = {
    // roles have been fetched from backend
    [FIREBASE_ROLES]:   (state, action) => action.payload,
    // if user has logged out then remove roles data
    [FIREBASE_AUTH]:    (state, action) => action.payload ? state : null,
};

export default (state = null, action) =>
    handleReducers(handlers, state, action);
