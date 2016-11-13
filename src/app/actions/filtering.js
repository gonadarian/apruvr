import axios from 'axios';
import {
    CHANGE_LANGUAGE,
    FETCH_NODES,
    FILTER_CONTENT_KIND,
    FILTER_TOPIC,
    FILTER_VISIBIITY,
} from './types';

const API_TRANSLATE_NOW = 'https://www.khanacademy.org/api/internal/translate_now?';

/**
 * Activated by the user. Triggers other actions, does nothing by itself.
 * @param  {Object} language structure containing language name and code.
 * @return {undefined}
 */
export const chooseLanguage = (language) => (dispatch) => {
    // change the chosen language in the state
    dispatch({
        type:       CHANGE_LANGUAGE,
        payload:    language,
    });

    // get translation data from Khan Academy API and set in state
    dispatch({
        type:       FETCH_NODES,
        payload:    axios.get(`${API_TRANSLATE_NOW}lang=${language.code}`),
    });
};

export const filterContentKind = (contentKind) => (dispatch) => {
    // change the chosen content type in the store
    dispatch({
        type:       FILTER_CONTENT_KIND,
        payload:    contentKind,
    });
};

export const filterTopic = (topic) => (dispatch) => {
    // change the chosen topic in the store
    dispatch({
        type:       FILTER_TOPIC,
        payload:    topic,
    });
};

export const filterVisibility = (key) => (dispatch) => {
    // change the chosen visibility in the store
    dispatch({
        type:       FILTER_VISIBIITY,
        payload:    key,
    });
};
