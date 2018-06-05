/* @flow */
import firebase from '@firebase/app';
import '@firebase/database';
import { type LanguageType } from '../consts';
import type { ActionType, Dispatch } from '../flows';
import { FETCH_NODES } from './types';

// TODO: Move to firebase file and remove this one.
export const fetchNodes = (language: LanguageType): ActionType =>
    (dispatch: Dispatch) => {
        if (!language) {
            dispatch({
                type:    FETCH_NODES,
                payload: null,
            });
            return;
        }
        const db = firebase.database();
        db.ref(`translation/${language.code}`).on(
            'value',
            (snapshot): void => dispatch({
                type:    FETCH_NODES,
                payload: snapshot,
            })
        );
    };
