import isNil from 'lodash/isNil';
import { CHANGE_LANGUAGE, FETCH_NODES } from '../actions/types';
import handleReducers from './handler';

const handlers = {
    // show loading indicator when language is chosen, as resources are loading
    [CHANGE_LANGUAGE]:  (state, action) => !isNil(action.payload),
    // translation data was fetched, remove the loading indicator
    [FETCH_NODES]:      () => false,
};

export default (state = false, action) =>
    handleReducers(handlers, state, action);
