import { FIREBASE_FETCH_ONCE } from '../actions/types';
import handleReducers from './handler';

const handlers = {
    [FIREBASE_FETCH_ONCE]: (state, action) => {
        return action.payload.val();
    },
};

export default (state = null, action) =>
    handleReducers(handlers, state, action);
