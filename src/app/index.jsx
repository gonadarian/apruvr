/* @flow */
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ApruvrPage } from './pages';

const app = document.getElementById('app');
if (app) {
    render((
        <Provider store={store}>
            <BrowserRouter>
                <Route path="/:lang?/:kind?/:topic?" component={ApruvrPage} />
            </BrowserRouter>
        </Provider>
    ), app);
}
