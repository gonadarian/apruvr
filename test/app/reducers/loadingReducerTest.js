import { expect } from '../../helper';
import { CHANGE_LANGUAGE, FETCH_NODES } from '../../../src/app/actions/types';
import loadingReducer from '../../../src/app/reducers/loadingReducer';

describe('Loading Reducer', () => {
    it('handles action with unknown type', () => {
        // eslint-disable-next-line no-undefined
        expect(loadingReducer(undefined, {})).to.eql(false);
    });

    it('handles CHANGE_LANGUAGE action', () => {
        const action = { type: CHANGE_LANGUAGE };
        expect(loadingReducer(false, action)).to.eql(true);
        expect(loadingReducer(true, action)).to.eql(true);
    });

    it('handles FETCH_NODES action', () => {
        const action = { type: FETCH_NODES };
        expect(loadingReducer(false, action)).to.eql(false);
        expect(loadingReducer(true, action)).to.eql(false);
    });
});
