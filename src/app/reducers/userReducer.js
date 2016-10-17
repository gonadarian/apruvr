import { FIREBASE_AUTH } from '../actions/types';
import handleReducers from './handler';

const handlers = {
    [FIREBASE_AUTH]: (state, action) => action.payload,
};

export default (state = null, action) =>
    handleReducers(handlers, state, action);
