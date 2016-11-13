import axios from 'axios';
import firebase from 'firebase';
import {
    CHANGE_LANGUAGE,
    FETCH_NODES,
    FILTER_CONTENT_KIND,
    FILTER_TOPIC,
    FILTER_VISIBIITY,
    FIREBASE_FETCH_ONCE,
    FIREBASE_AUTH,
    FIREBASE_ROLES,
    FIREBASE_USERS,
} from './types';

const API_TRANSLATE_NOW = 'https://www.khanacademy.org/api/internal/translate_now?';

/**
 * Activated by the user. Triggers other actions, does nothing by itself.
 * @param  {Object} language structure containing language name and code.
 * @return {undefined}
 */
export const chooseLanguage = (language) => (dispatch) => {
    // change the chosen language in the state
    dispatch({
        type:       CHANGE_LANGUAGE,
        payload:    language,
    });

    // get translation data from Khan Academy API and set in state
    dispatch({
        type:       FETCH_NODES,
        payload:    axios.get(`${API_TRANSLATE_NOW}lang=${language.code}`),
    });
};

export const filterContentKind = (contentKind) => (dispatch) => {
    // change the chosen content type in the store
    dispatch({
        type:       FILTER_CONTENT_KIND,
        payload:    contentKind,
    });
};

export const filterTopic = (topic) => (dispatch) => {
    // change the chosen topic in the store
    dispatch({
        type:       FILTER_TOPIC,
        payload:    topic,
    });
};

export const filterVisibility = (key) => (dispatch) => {
    // change the chosen visibility in the store
    dispatch({
        type:       FILTER_VISIBIITY,
        payload:    key,
    });
};

export const firebaseGetUsers = () => (dispatch) => {
    firebase.database().ref('users').on(
        'value',
        (snapshot) => dispatch({
            type:       FIREBASE_USERS,
            payload:    snapshot,
        })
    );
};

export const firebaseFetchOnce = (snapshot) => (dispatch) => {
    // change the content workflow data as obtained from backend
    dispatch({
        type:       FIREBASE_FETCH_ONCE,
        payload:    snapshot,
    });
};

export const firebaseAuth = (user) => (dispatch) => {
    // user can be null in case of logout event
    dispatch({
        type:       FIREBASE_AUTH,
        payload:    user,
    });

    // if user was logged out, nothing more to be done
    if (!user) {
        return;
    }

    const { uid, displayName, email, photoURL } = user;

    // get user roles if there are any
    firebase.database().ref(`roles/${uid}`).on(
        'value',
        (snapshot) => dispatch({
            type:       FIREBASE_ROLES,
            payload:    snapshot,
        })
    );

    // save user data on server for future reference
    firebase.database().ref(`users/${uid}`).set(
        { displayName, email, photoURL }
    );
};

export const firebaseSetStatus = (language, slug, status) => () => {
    const { uid } = firebase.auth().currentUser;
    const value = {
        status,
        uid,
    };
    firebase.database().ref(`status/${language}/${slug}`).set(value);
};

/**
 * Initializes authentication workflow. User can sing in using Google account.
 * Returns no action, as Firebase has a listener for authentication state
 * change.
 * @param  {Object} firebase central object used for Firebase auth service.
 * @return {undefined}
 */
export const firebaseSignIn = () => () =>
    firebase.auth().signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
    );

/**
 * Signs out the user. Returns no action, as Firebase has a listener for
 * authentication state change.
 * @param  {Object} firebase central object used for Firebase auth service.
 * @return {undefined}
 */
export const firebaseSignOut = () => () =>
    firebase.auth().signOut();
