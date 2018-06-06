import { forOwn } from 'lodash';
import { FILTER_VISIBIITY } from '../actions/types';
import visibilityReducer from './visibilityReducer';

describe('Topic Reducer', () => {
    test('should initialize to full visibility for any action', () => {
        // eslint-disable-next-line no-undefined
        const state = visibilityReducer(undefined, {});
        forOwn(state, (visibility) =>
            expect(visibility).toBeTruthy());
    });

    test('should handle switching visibility off and on again', () => {
        // eslint-disable-next-line no-undefined
        let state = visibilityReducer(undefined, {});
        const action = { type: FILTER_VISIBIITY, payload: 'translated' };
        state = visibilityReducer(state, action);
        expect(state.translated).toEqual(false);
        state = visibilityReducer(state, action);
        expect(state.translated).toEqual(true);
    });

    test('should ignore bad visibility key and avoid state mutation', () => {
        // eslint-disable-next-line no-undefined
        const oldState = visibilityReducer(undefined, {});
        const action = { type: FILTER_VISIBIITY, payload: 'foobar' };
        const state = visibilityReducer(oldState, action);
        expect(oldState).toBe(state);
    });
});
