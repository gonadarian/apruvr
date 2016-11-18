import mapValues from 'lodash/mapValues';
import { FILTER_VISIBIITY } from '../actions/types';
import handleReducers from './handler';

const INITIAL_VISIBILITY = {
    fresh:      true,
    doing:      true,
    translated: true,
    approved:   true,
    subtitled:  true,
    dubbed:     true,
};

const handlers = {
    // one of the visiblity filters has been switched
    [FILTER_VISIBIITY]: (state, action) =>
        mapValues(
            state,
            (visible, key) =>
                key === action.payload ? !visible : visible
        ),
};

export default (state = INITIAL_VISIBILITY, action) =>
    handleReducers(handlers, state, action);
