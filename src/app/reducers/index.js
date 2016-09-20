import { combineReducers } from 'redux';

import languageReducer from './languageReducer';
import loadingReducer from './loadingReducer';
import nodesReducer from './nodesReducer';
import topicTreeReducer from './topicTreeReducer';
import topicReducer from './topicReducer';
import contentKindReducer from './contentKindReducer';
import visibilityReducer from './visibilityReducer';

const RootReducer = combineReducers({
    language:   languageReducer,
    loading:    loadingReducer,
    nodes:      nodesReducer,
    tree:       topicTreeReducer,
    topic:      topicReducer,
    content:    contentKindReducer,
    visibility: visibilityReducer,
});

export default RootReducer;
