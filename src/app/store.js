import { createStore, applyMiddleware, compose } from 'redux';
import persistState from 'redux-localstorage';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import reducers from './reducers';

const logger = createLogger();

const store = compose(
    applyMiddleware(
        logger,
        thunk,
        promise,
    ),
    persistState(
        ['language', 'content', 'topic', 'visibility'],
        { key: 'apruvr' },
    ),
)(createStore)(reducers);

export default store;
