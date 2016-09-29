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
    [FILTER_VISIBIITY]: (state, action) => {
        const newState = mapValues(
            state,
            (visible, key) =>
                key === action.payload ? !visible : visible
        );
        return newState;
    },
};

export default (state = INITIAL_VISIBILITY, action) =>
    handleReducers(handlers, state, action);
