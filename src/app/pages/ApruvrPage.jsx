/* @flow */
import React, { Component, type Element } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import firebase from '@firebase/app';
import '@firebase/auth';
import { pickBy, transform, isEmpty } from 'lodash';
import { routeChange, userAuth, fetchUsers } from '../actions';
import { languageLookup, type LanguageType, type ContentKindType } from '../consts';
import { LanguagePicker, SignInButton, LoadingSpinner } from '../containers';
import type { RouteParamsType } from '../routes';
import type { State, UserType } from '../flows';
import styles from '../styles/main.less';

interface OwnPropsType {
    params: { lang: ?string },
    location: { pathname: string },
}

interface StatePropsType extends OwnPropsType {
    language: ?LanguageType,
    content: ContentKindType,
    topic: string,
}

interface PropsType extends StatePropsType {
    children: ?Element<*>,
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
            userAuth(user);
        });
    }

    componentDidMount () {
        const { onRouteChange, onUsersLoad, params } = this.props;
        // save to state initial path params before components are loaded
        if (!isEmpty(params)) {
            onRouteChange(params);
        }
        // get list of users
        onUsersLoad();
        // redirect to last used path
        const { language, content, topic } = this.props;
        if (language && content && topic) {
            browserHistory.push(`/${language.code}/${content.code}/${topic}`);
        }
    }

    componentDidUpdate (prevProps: PropsType) {
        const { location, params } = this.props;
        if (location.pathname === prevProps.location.pathname) {
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
        const { language, children } = this.props;
        return <div>
            <div className={`jumbotron text-center ${styles.dark}`}>
                <h1>Khan Academy Apruvr</h1>
                <h3>Approval workflow for Khan Academy translations</h3>
            </div>
            <div className="container-fluid">
                <LanguagePicker language={language} />
                <SignInButton />
                <LoadingSpinner />
                {children}
            </div>
        </div>;
    }
}

export default connect(
    (state: State, props: OwnPropsType): StatePropsType => ({
        params:   props.params,
        location: props.location,
        language: languageLookup(props.params.lang),
        content:  state.content,
        topic:    state.topic,
    }),
    (dispatch: Dispatch): void => bindActionCreators({
        onRouteChange: routeChange,
        onUserAuth:    userAuth,
        onUsersLoad:   fetchUsers,
    }, dispatch)
)(ApruvrPage);
