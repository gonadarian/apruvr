/* @flow */
import React, { type ComponentType, Component } from 'react';
import { browserHistory } from 'react-router';
import firebase from '@firebase/app';
import '@firebase/auth';
import { pickBy, transform, isEmpty } from 'lodash';
import { routeChange, userAuth, fetchUsers } from '../actions';
import type { Store, UserType } from '../flows';

type Props = {
    params: {lang: string},
    location: {pathname: string},
}

const apruvrPage = (store: Store, WrappedComponent: ComponentType<Props>) =>
    class HOC extends Component<Props, {}> {
        constructor (props: Props) {
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
                userAuth(user)(store.dispatch);
            });
        }

        componentDidMount () {
            // save to state initial path params before components are loaded
            if (!isEmpty(this.props.params)) {
                store.dispatch(routeChange(this.props.params));
            }

            // get list of users
            fetchUsers()(store.dispatch);

            // redirect to last used path
            const { language, content, topic } = store.getState();
            if (language && content && topic) {
                browserHistory.push(`/${language.code}/${content.code}/${topic}`);
            }
        }

        componentDidUpdate (prevProps: Props) {
            if (this.props.location.pathname === prevProps.location.pathname) {
                return;
            }
            // ignore unchanged parameters
            const newAndChangedParams = pickBy(
                this.props.params,
                (value, param) => !(param in prevProps.params) || value !== prevProps.params[param]
            );
            // keep information about removed parameters
            const removedParams = transform(
                prevProps.params,
                (memo, value, param) => {
                    if (!(param in this.props.params)) {
                        memo[param] = null;
                    }
                },
                {}
            );
            // and merge them before sending
            const params = { ...newAndChangedParams, ...removedParams };
            if (!isEmpty(params)) {
                store.dispatch(routeChange(params));
            }
        }

        render () {
            return <WrappedComponent {...this.props} />;
        }
    };

export default apruvrPage;
