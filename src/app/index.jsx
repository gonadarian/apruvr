/* @flow */
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import persistState from 'redux-localstorage';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import firebase from 'firebase';
import reducers from './reducers';
import { LanguagePage } from './pages';
import { userAuth, chooseLanguage, fetchUsers } from './actions';
import type { UserType } from './flows';

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

firebase.initializeApp({
    apiKey:             'AIzaSyBXjOncuS3h9Fz9Boar8t3OcJhiDZL_sgE',
    authDomain:         'apruvr.firebaseapp.com',
    databaseURL:        'https://apruvr.firebaseio.com',
    storageBucket:      'apruvr.appspot.com',
    messagingSenderId:  '1081977594498',
});

// initialize user session, store user data in database
firebase.auth().onAuthStateChanged((user: UserType) => {
    userAuth(user)(store.dispatch);
});

// get list of users
fetchUsers()(store.dispatch);

// initialize language data if language choice is kept in localStorage
if (store.getState().language) {
    chooseLanguage(store.getState().language)(store.dispatch);
}

render((
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={LanguagePage} />
        </Router>
    </Provider>
), document.getElementById('app'));
