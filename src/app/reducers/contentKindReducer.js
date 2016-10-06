import { FILTER_CONTENT_KIND } from '../actions/types';
import { CONTENTS } from '../consts';
import handleReducers from './handler';

const handlers = {
    [FILTER_CONTENT_KIND]: (state, action) => action.payload,
};

export default (state = CONTENTS[0], action) =>
    handleReducers(handlers, state, action);
