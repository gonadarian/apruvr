/* @flow */
import { combineReducers } from 'redux';
import type { LanguageType, ContentKindType, VisibilityType } from '../consts';
import type { UserType, NodeMapType, WorkflowMapType } from '../flows';
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
});

export type StateType = {
    language: ?LanguageType,
    loading: boolean,
    nodes: ?NodeMapType,
    topic: string,
    content: ContentKindType,
    visibility: {[type: VisibilityType]: boolean},
    workflow: ?WorkflowMapType,
    user: ?UserType,
    roles: ?string,
    users: ?UserType[],
};

export default RootReducer;
