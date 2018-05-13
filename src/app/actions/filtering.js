/* @flow */
import type { ActionType } from '../flows';
import { FILTER_VISIBIITY } from './types';

export const filterVisibility = (key: string): ActionType =>
    (dispatch: Dispatch) => {
        // change the chosen visibility in the store
        dispatch({
            type:    FILTER_VISIBIITY,
            payload: key,
        });
    };
