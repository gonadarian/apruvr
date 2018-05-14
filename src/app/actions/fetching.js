/* @flow */
import axios from 'axios';
import { urls, type LanguageType } from '../consts';
import type { ActionType, Dispatch } from '../flows';
import { FETCH_NODES } from './types';

const { api } = urls;

export const fetchNodes = (language: LanguageType): ActionType =>
    (dispatch: Dispatch) => {
        // get translation data from Khan Academy API and set in state
        dispatch({
            type:    FETCH_NODES,
            payload: language
                ? axios.get(`${api}/translate_now?lang=${language.code}`)
                : null,
        });
    };
