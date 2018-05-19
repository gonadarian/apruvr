/* @flow */
import React from 'react';
import { Route, Redirect } from 'react-router';
import { apruvrPage, languagePage, tracing } from './hocs';
import { ApruvrPage, LanguagePage } from './pages';
import type { Store } from './flows';

export type RouteParamsType = {
    land?: string,
    kind?: string,
    topic?: string,
};

const routes = (store: Store) =>
    <Route path="/"
        component={tracing('APRUVR ')(apruvrPage(store, ApruvrPage))}>
        <Redirect from=":lang" to=":lang/exercises/root.math)" />
        <Redirect from=":lang/:kind" to=":lang/:kind/root.math)" />
        <Route path=":lang">
            <Route path=":kind/:topic"
                component={tracing('LANGUAGE ')(languagePage(store, LanguagePage))} />
        </Route>
    </Route>;

export default routes;
