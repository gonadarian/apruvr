/* @flow */
import React from 'react';
import { Route, Redirect } from 'react-router';
import { tracing } from './hocs';
import { ApruvrPage, LanguagePage } from './pages';

export type RouteParamsType = {
    land?: string,
    kind?: string,
    topic?: string,
};

const routes =
    <Route path="/"
        component={tracing('APRUVR ')(ApruvrPage)}>
        <Redirect from=":lang" to=":lang/exercises/root.math)" />
        <Redirect from=":lang/:kind" to=":lang/:kind/root.math)" />
        <Route path=":lang">
            <Route path=":kind/:topic" component={tracing('LANGUAGE ')(LanguagePage)} />
        </Route>
    </Route>;

export default routes;
