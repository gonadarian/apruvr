/* @flow */
import { combineReducers } from 'redux';
import type { LanguageType, ContentKindType, VisibilityListType } from '../consts';
import type { UserType, NodeMapType, WorkflowMapType, HistoryType } from '../flows';
import languageReducer from './languageReducer';
import loadingReducer from './loadingReducer';
import nodesReducer from './nodesReducer';
import topicReducer from './topicReducer';
import contentKindReducer from './contentKindReducer';
import visibilityReducer from './visibilityReducer';
import workflowReducer from './workflowReducer';
import userReducer from './userReducer';
import rolesReducer from './rolesReducer';
import usersReducer from './usersReducer';
import historyReducer from './historyReducer';
import exportingReducer from './exportingReducer';

const RootReducer = combineReducers({
    language:   languageReducer,
    loading:    loadingReducer,
    nodes:      nodesReducer,
    topic:      topicReducer,
    content:    contentKindReducer,
    visibility: visibilityReducer,
    workflow:   workflowReducer,
    user:       userReducer,
    roles:      rolesReducer,
    users:      usersReducer,
    history:    historyReducer,
    exporting:  exportingReducer,
});

export type State = {
    language: ?LanguageType,
    loading: boolean,
    nodes: ?NodeMapType,
    topic: string,
    content: ContentKindType,
    visibility: VisibilityListType,
    workflow: ?WorkflowMapType,
    user: ?UserType,
    roles: ?string,
    users: ?UserType[],
    history: ?HistoryType,
    exporting: boolean,
};

export type GetState = () => State;

export default RootReducer;
