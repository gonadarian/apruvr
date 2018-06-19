import { ROUTE_CHANGE } from '../../actions/types';
import topicReducer from '../topicReducer';

describe('Topic Reducer', () => {
    test('handles initialization actions', () => {
        // eslint-disable-next-line no-undefined
        expect(topicReducer(undefined, {})).toEqual('root.math');
        // eslint-disable-next-line no-undefined
        expect(topicReducer(undefined, { type: ROUTE_CHANGE, payload: {} })).toEqual('root.math');
    });

    test('should ignore invalid payload', () => {
        const oldState = 'root.math';
        const action = { type: ROUTE_CHANGE, payload: 'root.math.early-math' };
        expect(topicReducer(oldState, action)).toBe(oldState);
    });

    test('should handle change of topic', () => {
        const action = { type: ROUTE_CHANGE, payload: { topic: 'root.math.early-math' } };
        expect(topicReducer('root.math', action)).toEqual('root.math.early-math');
    });

    test('should ignore action if topic was unchanged', () => {
        const oldState = 'root.math.early-math';
        const action = { type: ROUTE_CHANGE, payload: { topic: 'root.math.early-math' } };
        expect(topicReducer(oldState, action)).toBe(oldState);
    });

    test('should ignore action if topic is not set', () => {
        const oldState = 'root.math.early-math';
        const action = { type: ROUTE_CHANGE, payload: { topic: null } };
        expect(topicReducer(oldState, action)).toBe(oldState);
    });
});
