import axios from 'axios';
import { CHANGE_LANGUAGE, FETCH_NODES, FILTER_CONTENT_KIND, FILTER_TOPIC, FILTER_VISIBIITY } from './types';

const API_TRANSLATE_NOW = 'https://www.khanacademy.org/api/internal/translate_now?';

const fetchNodes = (language) => ({
    type:       FETCH_NODES,
    payload:    axios.get(`${API_TRANSLATE_NOW}lang=${language.code}`),
});

const changeLanguage = (language) => ({
    type:       CHANGE_LANGUAGE,
    payload:    language,
});

export const chooseLanguage = (language) => (dispatch) => {
    dispatch(changeLanguage(language));
    dispatch(fetchNodes(language));
};

export const filterContentKind = (contentKind) => ({
    type:       FILTER_CONTENT_KIND,
    payload:    contentKind,
});

export const filterTopic = (topic) => ({
    type:       FILTER_TOPIC,
    payload:    topic,
});

export const filterVisibility = (key) => ({
    type:       FILTER_VISIBIITY,
    payload:    key,
});
