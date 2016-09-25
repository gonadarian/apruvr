import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import reducers from './reducers';
import LanguagePage from './pages/LanguagePage';

const store = applyMiddleware(thunk, promise)(createStore)(reducers);

render((
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={LanguagePage} />
        </Router>
    </Provider>
), document.getElementById('app'));
