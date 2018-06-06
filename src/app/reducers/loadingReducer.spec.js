import { ROUTE_CHANGE, FETCH_NODES } from '../actions/types';
import loadingReducer from './loadingReducer';

describe('Loading Reducer', () => {
    test('should handle action with unknown type', () => {
        // eslint-disable-next-line no-undefined
        expect(loadingReducer(undefined, {})).toEqual(false);
    });

    test('should handle route change action with invalid payload', () => {
        let action = {};
        expect(loadingReducer(false, action)).toEqual(false);
        action = { type: ROUTE_CHANGE, payload: {} };
        expect(loadingReducer(true, action)).toEqual(false);
        expect(loadingReducer(false, action)).toEqual(false);
    });

    test('should handle route change action with valid payload', () => {
        let action = { type: ROUTE_CHANGE, payload: { lang: null } };
        expect(loadingReducer(true, action)).toEqual(false);
        expect(loadingReducer(false, action)).toEqual(false);
        action = { type: ROUTE_CHANGE, payload: { lang: 'sr' } };
        expect(loadingReducer(true, action)).toEqual(true);
        expect(loadingReducer(false, action)).toEqual(true);
        action = { type: ROUTE_CHANGE, payload: { lang: 'xyz' } };
        expect(loadingReducer(true, action)).toEqual(true);
        expect(loadingReducer(false, action)).toEqual(true);
    });

    test('should handle fetch nodes action', () => {
        let action = { type: FETCH_NODES };
        expect(loadingReducer(false, action)).toEqual(false);
        expect(loadingReducer(true, action)).toEqual(false);
        action = { type: FETCH_NODES, payload: {} };
        expect(loadingReducer(false, action)).toEqual(false);
        expect(loadingReducer(true, action)).toEqual(false);
        action = { type: FETCH_NODES, payload: { lang: 'sr' } };
        expect(loadingReducer(false, action)).toEqual(false);
        expect(loadingReducer(true, action)).toEqual(false);
    });
});
