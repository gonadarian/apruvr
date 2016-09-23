import handleReducers from './handler';
import { FILTER_CONTENT_KIND } from '../actions/types';
import { CONTENTS } from '../helpers/consts';

const handlers = {
    [FILTER_CONTENT_KIND]: (state, action) => action.payload,
};

export default (state = CONTENTS[0], action) =>
    handleReducers(handlers, state, action);
