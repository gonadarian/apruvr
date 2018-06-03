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
import { pickBy, transform } from 'lodash';
import { LanguagePage } from './';
import { routeChange, userAuth, fetchUsers, fetchDurations } from '../actions';
import { type LanguageType, type ContentKindType } from '../consts';
import { LanguagePicker, SignInButton, LoadingSpinner } from '../containers';
import { hasValues } from '../utils';
import type { State, UserType, RouteParamsType } from '../flows';

interface OwnPropsType {
    match: Match,
    history: RouterHistory,
    location: Location,
}

interface StatePropsType {
    pathname: string,
    language: ?LanguageType,
    content: ContentKindType,
    topic: string,
}

interface PropsType extends OwnPropsType, StatePropsType {
    onRouteChange: (route: RouteParamsType) => void,
    onUserAuth: (user: UserType) => void,
    onUsersLoad: () => void,
    onDuratiosLoad: () => void,
}

class ApruvrPage extends Component<PropsType> {
    constructor (props: PropsType) {
        super(props);

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
        const { onRouteChange, onUsersLoad, onDuratiosLoad } = this.props;
        const { match: { params }, history } = this.props;
        // save to state initial path params before components are loaded
        if (hasValues(params)) {
            onRouteChange(params);
        }
        // get list of users
        onUsersLoad();
        // get durations of all videos
        onDuratiosLoad();
        // redirect to last used path
        const { language, content, topic } = this.props;
        if (language && content && topic) {
            history.push(`/${language.code}/${content.code}/${topic}`);
        }
    }

    componentDidUpdate (prevProps: PropsType) {
        const { pathname, match: { params } } = this.props;
        const prevParams = prevProps.match.params;
        if (pathname === prevProps.pathname) {
            return;
        }
        // ignore unchanged parameters
        const newAndChangedParams = pickBy(
            params,
            (value: ?string, param: string) =>
                !(param in prevParams) || value !== prevParams[param]
        );
        // keep information about removed parameters
        const removedParams = transform(
            prevParams,
            (memo, value, param) => {
                if (!(param in params)) {
                    memo[param] = null;
                }
            },
            {}
        );
        // and merge them before sending
        const updateParams = { ...newAndChangedParams, ...removedParams };
        if (hasValues(updateParams)) {
            this.props.onRouteChange(updateParams);
        }
    }

    render () {
        const { language } = this.props;
        return <div>
            <nav className="navbar navbar-default"
                style={{
                    backgroundColor: '#314453',
                    color:           '#f5f5f5',
                }}>
                <div className="container-fluid">
                    <h1>
                        Khan Academy Apruvr
                        <small className="text-muted">
                            <em> approval workflow for Khan Academy translations</em>
                        </small>
                    </h1>
                </div>
            </nav>
            <div className="container-fluid">
                <LanguagePicker language={language} />
                <SignInButton />
                <LoadingSpinner />
                <Switch>
                    <Route path="/:lang/:kind/:topic" component={LanguagePage} />
                    <Redirect exact from="/:lang/:kind" to=":lang/:kind/root.math" />
                    <Redirect exact from="/:lang" to=":lang/exercises/root.math" />
                </Switch>
            </div>
        </div>;
    }
}

export default connect(
    (state: State, props: OwnPropsType): StatePropsType => ({
        pathname: props.location.pathname,
        language: state.language,
        content:  state.content,
        topic:    state.topic,
    }),
    (dispatch: Dispatch) => bindActionCreators({
        onRouteChange:  routeChange,
        onUserAuth:     userAuth,
        onUsersLoad:    fetchUsers,
        onDuratiosLoad: fetchDurations,
    }, dispatch)
)(ApruvrPage);
