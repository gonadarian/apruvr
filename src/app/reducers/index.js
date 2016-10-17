import { combineReducers } from 'redux';
import languageReducer from './languageReducer';
import loadingReducer from './loadingReducer';
import nodesReducer from './nodesReducer';
import topicReducer from './topicReducer';
import contentKindReducer from './contentKindReducer';
import visibilityReducer from './visibilityReducer';
import workflowReducer from './workflowReducer';
import userReducer from './userReducer';

const RootReducer = combineReducers({
    language:   languageReducer,
    loading:    loadingReducer,
    nodes:      nodesReducer,
    topic:      topicReducer,
    content:    contentKindReducer,
    visibility: visibilityReducer,
    workflow:   workflowReducer,
    user:       userReducer,
});

export default RootReducer;
