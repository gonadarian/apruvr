import deepFreeze from 'deep-freeze';
import { expect } from '../../helper';
import { CHANGE_LANGUAGE } from '../../../src/app/actions/types';
import languageReducer from '../../../src/app/reducers/languageReducer';

describe('Language Reducer', () => {
    it('handles action with unknown type', () => {
        // eslint-disable-next-line no-undefined
        expect(languageReducer(undefined, {})).to.eql(null);
    });

    it('handles CHANGE_LANGUAGE action', () => {
        const oldState = [];
        deepFreeze(oldState);
        const state = { code: 'bg', name: 'Bulgarian' };
        const action = { type:  CHANGE_LANGUAGE, payload: state };
        expect(languageReducer(oldState, action)).to.eql(state);
    });

    it('handles CHANGE_LANGUAGE action with a note', () => {
        const oldState = [];
        deepFreeze(oldState);
        const state = { code: 'sr', name: 'Serbian', note: 'Cyrillic' };
        const action = { type:  CHANGE_LANGUAGE, payload: state };
        expect(languageReducer(oldState, action)).to.eql(state);
    });

    it('handles CHANGE_LANGUAGE action with previous valid state', () => {
        const oldState = { code: 'bg', name: 'Bulgarian' };
        deepFreeze(oldState);
        const state = { code: 'sr', name: 'Serbian', note: 'Cyrillic' };
        const action = { type:  CHANGE_LANGUAGE, payload: state };
        expect(languageReducer(oldState, action)).to.eql(state);
    });
});
