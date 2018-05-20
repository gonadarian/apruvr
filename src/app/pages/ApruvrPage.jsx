/* @flow */
import React, { Component } from 'react';
import {
    Route, Switch, Redirect,
    type RouterHistory, type Location, type Match,
} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import firebase from '@firebase/app';
import '@firebase/auth';
import { pickBy, transform, isEmpty } from 'lodash';
import { tracing } from '../hocs';
import { routeChange, userAuth, fetchUsers } from '../actions';
import { languageLookup, type LanguageType, type ContentKindType } from '../consts';
import { LanguagePicker, SignInButton, LoadingSpinner } from '../containers';
import type { State, UserType, RouteParamsType } from '../flows';
import LanguagePage from './LanguagePage';
import styles from '../styles/main.less';

interface OwnPropsType {
    match: Match,
    history: RouterHistory,
    location: Location,
}

interface StatePropsType {
    params: { lang: ?string },
    pathname: string,
    language: ?LanguageType,
    content: ContentKindType,
    topic: string,
}

interface PropsType extends OwnPropsType, StatePropsType {
    onRouteChange: (route: RouteParamsType) => void,
    onUserAuth: (user: UserType) => void,
    onUsersLoad: () => void,
}

class ApruvrPage extends Component<PropsType, {}> {
    constructor (props: PropsType) {
        super(props);
        this.state = {};

        // initialize firebase
        firebase.initializeApp({
            apiKey:            'AIzaSyBXjOncuS3h9Fz9Boar8t3OcJhiDZL_sgE',
            authDomain:        'apruvr.firebaseapp.com',
            databaseURL:       'https://apruvr.firebaseio.com',
            storageBucket:     'apruvr.appspot.com',
            messagingSenderId: '1081977594498',
        });

        // initialize user session, store user data in database
        firebase.auth().onAuthStateChanged((user: UserType) => {
            this.props.onUserAuth(user);
        });
    }

    componentDidMount () {
        const { onRouteChange, onUsersLoad, params, history } = this.props;
        // save to state initial path params before components are loaded
        if (!isEmpty(params)) {
            onRouteChange(params);
        }
        // get list of users
        onUsersLoad();
        // redirect to last used path
        const { language, content, topic } = this.props;
        if (language && content && topic) {
            history.push(`/${language.code}/${content.code}/${topic}`);
        }
    }

    componentDidUpdate (prevProps: PropsType) {
        const { pathname, params } = this.props;
        if (pathname === prevProps.pathname) {
            return;
        }
        // ignore unchanged parameters
        const newAndChangedParams = pickBy(
            params,
            (value, param) =>
                !(param in prevProps.params) || value !== prevProps.params[param]
        );
        // keep information about removed parameters
        const removedParams = transform(
            prevProps.params,
            (memo, value, param) => {
                if (!(param in params)) {
                    memo[param] = null;
                }
            },
            {}
        );
        // and merge them before sending
        const updateParams = { ...newAndChangedParams, ...removedParams };
        if (!isEmpty(updateParams)) {
            this.props.onRouteChange(updateParams);
        }
    }

    render () {
        const { language } = this.props;
        return <div>
            <div className={`jumbotron text-center ${styles.dark}`}>
                <h1>Khan Academy Apruvr</h1>
                <h3>Approval workflow for Khan Academy translations</h3>
            </div>
            <div className="container-fluid">
                <LanguagePicker language={language} />
                <SignInButton />
                <LoadingSpinner />
                <Switch>
                    <Route path="/:lang/:kind/:topic"
                        component={tracing('LANGUAGE ')(LanguagePage)} />
                    <Redirect exact from="/:lang/:kind" to=":lang/:kind/root.math" />
                    <Redirect exact from="/:lang" to=":lang/exercises/root.math" />
                </Switch>
            </div>
        </div>;
    }
}

export default connect(
    (state: State, props: OwnPropsType): StatePropsType => ({
        params:   props.match.params,
        pathname: props.location.pathname,
        language: languageLookup(props.match.params.lang),
        content:  state.content,
        topic:    state.topic,
    }),
    (dispatch: Dispatch): void => bindActionCreators({
        onRouteChange: routeChange,
        onUserAuth:    userAuth,
        onUsersLoad:   fetchUsers,
    }, dispatch)
)(ApruvrPage);
