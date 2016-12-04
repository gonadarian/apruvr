import { mapValues } from 'lodash';
import { FILTER_VISIBIITY } from '../actions/types';
import handleReducers from './handler';

const INITIAL_VALUE = {
    fresh:      true,
    doing:      true,
    translated: true,
    approved:   true,
    subtitled:  true,
    dubbed:     true,
};

const handlers = {
    // one of the visiblity filters has been switched
    [FILTER_VISIBIITY]: (state, { payload }) =>
        mapValues(
            state,
            (visible, key) =>
                key === payload ? !visible : visible
        ),
};

export default (state = INITIAL_VALUE, action) =>
    handleReducers(handlers, state, action);
