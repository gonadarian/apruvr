import { FIREBASE_ROLES } from '../actions/types';
import handleReducers from './handler';

const handlers = {
    [FIREBASE_ROLES]: (state, action) => action.payload,
};

export default (state = null, action) =>
    handleReducers(handlers, state, action);
