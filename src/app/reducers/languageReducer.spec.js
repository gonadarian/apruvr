import deepFreeze from 'deep-freeze';
import { ROUTE_CHANGE } from '../actions/types';
import languageReducer from './languageReducer';

describe('Language Reducer', () => {
    test('should handle action with unknown type', () => {
        // eslint-disable-next-line no-undefined
        expect(languageReducer(undefined, {})).toEqual(null);
    });

    test('should handle route change action with valid language', () => {
        const action = { type: ROUTE_CHANGE, payload: { lang: 'sr' } };
        const state = { code: 'sr', name: 'Serbian', note: 'Cyrillic' };
        expect(languageReducer(null, action)).toEqual(state);
    });

    test('should handles route change with invalid language', () => {
        const action = { type: ROUTE_CHANGE, payload: { lang: 'xyz' } };
        const state = null;
        expect(languageReducer(null, action)).toEqual(state);
    });

    test('should handle route change with preexisting language choice', () => {
        const oldState = { code: 'bg', name: 'Bulgarian' };
        deepFreeze(oldState);
        const action = { type: ROUTE_CHANGE, payload: { lang: 'sr' } };
        const state = { code: 'sr', name: 'Serbian', note: 'Cyrillic' };
        expect(languageReducer(oldState, action)).toEqual(state);
    });

    test('should not touch the state if language is the same as one already in state', () => {
        const oldState = { code: 'bg', name: 'Bulgarian' };
        const action = { type: ROUTE_CHANGE, payload: { lang: 'bg' } };
        deepFreeze(oldState);
        expect(languageReducer(oldState, action)).toBe(oldState);
    });

    test('should not touch the state if language is not provided', () => {
        const oldState = { code: 'bg', name: 'Bulgarian' };
        const action = { type: ROUTE_CHANGE, payload: { lang: null } };
        deepFreeze(oldState);
        expect(languageReducer(oldState, action)).toBe(oldState);
    });
});
