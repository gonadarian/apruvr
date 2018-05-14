/* @flow */
import {
    createStore,
    applyMiddleware,
    compose,
    type Store as ReduxStore,
} from 'redux';
import persistState from 'redux-localstorage';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import reducers, { type State } from './reducers';
import { type Action } from './actions';

const logger = createLogger();

export type Store = ReduxStore<State, Action>;

export const store = compose(
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
