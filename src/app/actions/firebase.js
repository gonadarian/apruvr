import firebase from 'firebase';
import {
    FIREBASE_FETCH_ONCE,
    FIREBASE_AUTH,
    FIREBASE_ROLES,
    FIREBASE_USERS,
} from './types';

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
