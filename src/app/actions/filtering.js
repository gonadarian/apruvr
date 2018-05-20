/* @flow */
import type { ActionType, Dispatch } from '../flows';
import { FILTER_VISIBIITY, EXPORT_NODES } from './types';

export const filterVisibility = (key: string): ActionType =>
    (dispatch: Dispatch) => {
        // change the chosen visibility in the store
        dispatch({
            type:    FILTER_VISIBIITY,
            payload: key,
        });
    };

export const startExport = (): ActionType =>
    (dispatch: Dispatch) => {
        // change the chosen visibility in the store
        dispatch({
            type:    EXPORT_NODES,
            payload: true,
        });
    };
