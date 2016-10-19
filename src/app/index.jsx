import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import firebase from 'firebase';
import reducers from './reducers';
import Fireduxed from './components/Fireduxed';
import LanguagePage from './pages/LanguagePage';
import { FIREBASE_AUTH } from './actions/types';

const logger = createLogger();

const store = applyMiddleware(
    logger,
    thunk,
    promise,
)(createStore)(reducers);

firebase.initializeApp({
    apiKey:             'AIzaSyBXjOncuS3h9Fz9Boar8t3OcJhiDZL_sgE',
    authDomain:         'apruvr.firebaseapp.com',
    databaseURL:        'https://apruvr.firebaseio.com',
    storageBucket:      'apruvr.appspot.com',
    messagingSenderId:  '1081977594498',
});

firebase.auth().onAuthStateChanged((user) => {
    store.dispatch({
        type:       FIREBASE_AUTH,
        payload:    user,
    });
});

render((
    <Provider store={store}>
        <Fireduxed firebase={firebase}>
            <Router history={hashHistory}>
                <Route path="/" component={LanguagePage} />
            </Router>
        </Fireduxed>
    </Provider>
), document.getElementById('app'));
