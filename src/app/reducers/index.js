import { combineReducers } from 'redux';
import languageReducer from './languageReducer';
import loadingReducer from './loadingReducer';
import nodesReducer from './nodesReducer';
import topicReducer from './topicReducer';
import contentKindReducer from './contentKindReducer';
import visibilityReducer from './visibilityReducer';

const RootReducer = combineReducers({
    language:   languageReducer,
    loading:    loadingReducer,
    nodes:      nodesReducer,
    topic:      topicReducer,
    content:    contentKindReducer,
    visibility: visibilityReducer,
});

export default RootReducer;
