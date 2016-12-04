import { ROUTE_CHANGE, FETCH_NODES } from '../actions/types';
import handleReducers from './handler';

const handlers = {
    // show loading indicator when language is chosen, as resources are loading
    [ROUTE_CHANGE]: (state, { payload }) => 'lang' in payload && payload.lang,
    // translation data was fetched, remove the loading indicator
    [FETCH_NODES]:  () => false,
};

export default (state = false, action) =>
    handleReducers(handlers, state, action);
