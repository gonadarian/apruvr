import axios from 'axios';

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const FETCH_NODES = 'FETCH_NODES';
export const FILTER_CONTENT_KIND = 'FILTER_CONTENT_KIND';
export const FILTER_TOPIC = 'FILTER_TOPIC';
export const FILTER_VISIBIITY = 'FILTER_VISIBIITY';

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
