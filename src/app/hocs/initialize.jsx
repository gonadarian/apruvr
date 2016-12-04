import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import firebase from 'firebase';
import type { UserType } from '../flows';
import { userAuth, fetchUsers } from '../actions';

const initialize = (store) => (WrappedComponent) =>
    class InitializeHOC extends Component {
        constructor() {
            super();

            // initialize firebase
            firebase.initializeApp({
                apiKey:             'AIzaSyBXjOncuS3h9Fz9Boar8t3OcJhiDZL_sgE',
                authDomain:         'apruvr.firebaseapp.com',
                databaseURL:        'https://apruvr.firebaseio.com',
                storageBucket:      'apruvr.appspot.com',
                messagingSenderId:  '1081977594498',
            });

            // initialize user session, store user data in database
            firebase.auth().onAuthStateChanged((user: UserType) => {
                userAuth(user)(store.dispatch);
            });
        }

        componentDidMount() {
            // get list of users
            fetchUsers()(store.dispatch);

            // redirect to last used path
            const { language, content, topic } = store.getState();
            if (language && content && topic) {
                browserHistory.push(`/${language.code}/${content.code}/${topic}`);
            }
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };

export default initialize;
