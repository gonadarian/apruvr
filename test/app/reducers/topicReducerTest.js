import { expect } from '../../helper';
import { FILTER_TOPIC } from '../../../src/app/actions/types';
import topicReducer from '../../../src/app/reducers/topicReducer';

describe('Topic Reducer', () => {
    it('handles action with unknown type', () => {
        // eslint-disable-next-line no-undefined
        expect(topicReducer(undefined, {})).to.eql('root.math');
    });

    it('handles FILTER_TOPIC action', () => {
        const payload = 'root.math.early-math';
        const action = { type: FILTER_TOPIC, payload };
        // eslint-disable-next-line no-undefined
        expect(topicReducer(undefined, action)).to.eql(payload);
        expect(topicReducer('root.math', action)).to.eql(payload);
    });
});
