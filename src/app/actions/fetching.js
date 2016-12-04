import axios from 'axios';
import { FETCH_NODES } from './types';

const API_TRANSLATE_NOW = 'https://www.khanacademy.org/api/internal/translate_now?';

export const fetchNodes = (language) => (dispatch) => {
    // get translation data from Khan Academy API and set in state
    dispatch({
        type:       FETCH_NODES,
        payload:    language
            ? axios.get(`${API_TRANSLATE_NOW}lang=${language.code}`)
            : null,
    });
};