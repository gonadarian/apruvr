/* @flow */
import { PAGE_EXPAND } from './types';
import type { ActionType, Dispatch } from '../flows';

export const pageExpand = (fullExpand: boolean): ActionType => (dispatch: Dispatch) => {
    dispatch({
        type:    PAGE_EXPAND,
        payload: fullExpand,
    });
};
