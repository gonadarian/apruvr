import _ from 'lodash';
import { expect } from '../../helper';
import { FILTER_VISIBIITY } from '../../../src/app/actions/types';
import visibilityReducer from '../../../src/app/reducers/visibilityReducer';

describe('Topic Reducer', () => {
    it('handles action with unknown type', () => {
        // eslint-disable-next-line no-undefined
        expect(visibilityReducer(undefined, {})).to.satisfy(
            (state) => _.reduce(state, (result, value) => result && value, true)
        );
    });

    it('handles FILTER_VISIBIITY action', () => {
        const payload = 'translated';
        const action = { type: FILTER_VISIBIITY, payload };
        // eslint-disable-next-line no-undefined
        let state = visibilityReducer(undefined, action);
        expect(state.translated).to.equals(false);
        state = visibilityReducer(state, action);
        expect(state.translated).to.equals(true);
    });
});
