import { ROUTE_CHANGE } from '../actions/types';
import topicReducer from './topicReducer';

describe('Topic Reducer', () => {
    test('handles action with unknown type', () => {
        // eslint-disable-next-line no-undefined
        expect(topicReducer(undefined, {})).toEqual('root.math');
    });

    test('should throw error on invalid payload', () => {
        const action = { type: ROUTE_CHANGE, payload: 'root.math.early-math' };
        expect(() => topicReducer('root.math', action)).toThrow(TypeError);
    });

    test('handles FILTER_TOPIC action', () => {
        const action = { type: ROUTE_CHANGE, payload: { topic: 'root.math.early-math' } };
        expect(topicReducer('root.math', action)).toEqual('root.math.early-math');
    });

    test('should handle unchanged topic in route change action', () => {
        const oldState = 'root.math.early-math';
        const action = { type: ROUTE_CHANGE, payload: { topic: 'root.math.early-math' } };
        expect(topicReducer(oldState, action)).toBe(oldState);
    });
});
