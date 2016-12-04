import { browserHistory } from 'react-router';
import { isEqual } from 'lodash';
import { ROUTE_CHANGE, FETCH_NODES } from './types';

export const routeChange = (params) => (dispatch) => {
    dispatch({
        type:       ROUTE_CHANGE,
        payload:    params,
    });
};

export const chooseLanguage = (language) => (dispatch, getState) => {
    // if language is not defined, redirect to root url
    if (!language) {
        browserHistory.push('/');
        return;
    }
    const current = getState().language;
    // if language is already chosen...
    if (current) {
        // and it's the same one, do nothing, otherwise...
        if (isEqual(current, language)) {
            return;
        }
        // clear stored nodes
        dispatch({
            type:       FETCH_NODES,
            payload:    null,
        });
    }
    // redirect to same url, just different language
    const { content, topic } = getState();
    browserHistory.push(`/${language.code}/${content.code}/${topic}`);
};

export const chooseContent = (content) => (dispatch, getState) => {
    const { language, topic } = getState();
    browserHistory.push(`/${language.code}/${content.code}/${topic}`);
};

export const chooseTopic = (topic) => (dispatch, getState) => {
    const { language, content } = getState();
    browserHistory.push(`/${language.code}/${content.code}/${topic}`);
};
