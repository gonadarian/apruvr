/* @flow */
import { browserHistory } from 'react-router';
import { isEqual } from 'lodash';
import { ROUTE_CHANGE, FETCH_NODES } from './types';
import type { ActionType, Dispatch, GetState } from '../flows';
import type { LanguageType, ContentKindType } from '../consts';
import type { RouteParamsType } from '../routes';

export const routeChange = (params: RouteParamsType): ActionType =>
    (dispatch: Dispatch) => {
        dispatch({
            type:    ROUTE_CHANGE,
            payload: params,
        });
    };

export const chooseLanguage = (language: LanguageType): ActionType =>
    (dispatch: Dispatch, getState: GetState) => {
        // if language is not defined, redirect to root url
        if (!language) {
            browserHistory.push('/');
            return;
        }
        const current = getState().language;
        // if language is already chosen...
        if (current) {
            // ...and it's the same one, do nothing, otherwise...
            if (isEqual(current, language)) {
                return;
            }
            // ...clear stored nodes
            dispatch({
                type:    FETCH_NODES,
                payload: null,
            });
        }
        // redirect to same url, just different language
        const { content, topic } = getState();
        browserHistory.push(`/${language.code}/${content.code}/${topic}`);
    };

export const chooseContent = (content: ContentKindType): ActionType =>
    (dispatch: Dispatch, getState: GetState) => {
        const { language, topic } = getState();
        if (!language) {
            throw Error(`Can not change content kind [${content.code}] if language is not set`);
        }
        browserHistory.push(`/${language.code}/${content.code}/${topic}`);
    };

export const chooseTopic = (topic: string): ActionType =>
    (dispatch: Dispatch, getState: GetState) => {
        const { language, content } = getState();
        if (!language) {
            throw Error(`Can not change topic [${topic}] if language is not set`);
        }
        browserHistory.push(`/${language.code}/${content.code}/${topic}`);
    };
