import axios from 'axios';
import { CHANGE_LANGUAGE, FETCH_NODES, FILTER_CONTENT_KIND, FILTER_TOPIC, FILTER_VISIBIITY } from './types';

const fetchNodes = (language) => {
    const url = `https://www.khanacademy.org/api/internal/translate_now?lang=${language.code}`;
    const request = axios.get(url);
    return {
        type:       FETCH_NODES,
        payload:    request,
    };
};

const changeLanguage = (language) => {
    return {
        type:       CHANGE_LANGUAGE,
        payload:    language,
    };
};

export const chooseLanguage = (language) => (dispatch) => {
    dispatch(changeLanguage(language));
    dispatch(fetchNodes(language));
};

export const filterContentKind = (contentKind) => {
    return {
        type:       FILTER_CONTENT_KIND,
        payload:    contentKind,
    };
};

export const filterTopic = (topic) => {
    return {
        type:       FILTER_TOPIC,
        payload:    topic,
    };
};

export const filterVisibility = (key) => {
    return {
        type:       FILTER_VISIBIITY,
        payload:    key,
    };
};
