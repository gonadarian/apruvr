import React from 'react';
import { Route, Redirect } from 'react-router';
import { pickBy, transform, isEmpty } from 'lodash';
import { routeChange, fetchNodes } from './actions';
import { ApruvrPage, LanguagePage } from './pages';
import { languageLookup } from './consts';
import { initialize } from './hocs';

export type RouteParamsType = {
    land?: string,
    kind?: string,
    topic?: string,
}

const handleAppEnter = ({ dispatch }) => ({ params }) => {
    // save to state initial path params before components are loaded
    if (!isEmpty(params)) {
        dispatch(routeChange(params));
    }
};

const handleAppChange = ({ dispatch }) => (prevState, nextState) => {
    // ignore unchanged parameters
    const newAndChangedParams = pickBy(
        nextState.params,
        (value, param) => !(param in prevState.params) || value !== prevState.params[param]
    );
    // keep information about removed parameters
    const removedParams = transform(
        prevState.params,
        (memo, value, param) => {
            if (!(param in nextState.params)) {
                memo[param] = null;
            }
        },
        {}
    );
    // and merge them before sending
    const params = { ...newAndChangedParams, ...removedParams };
    if (!isEmpty(params)) {
        dispatch(routeChange(params));
    }
};

const handleLanguageEnter = ({ dispatch }) => (nextState) => {
    const language = languageLookup(nextState.params.lang);
    // load language translation data
    dispatch(fetchNodes(language));
};

const routes = (store) =>
	<Route path="/"
        component={initialize(store)(ApruvrPage)}
        onEnter={handleAppEnter(store)}
        onChange={handleAppChange(store)}>
        <Redirect from=":lang" to=":lang/exercises/root.math)" />
        <Redirect from=":lang/:kind" to=":lang/:kind/root.math)" />
        <Route path=":lang"
            onEnter={handleLanguageEnter(store)}>
            <Route path=":kind/:topic"
                component={LanguagePage} />
        </Route>
    </Route>;

export default routes;
