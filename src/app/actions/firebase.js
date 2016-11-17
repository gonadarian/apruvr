import firebase from 'firebase';
import {
    FIREBASE_WORKFLOW,
    FIREBASE_AUTH,
    FIREBASE_ROLES,
    FIREBASE_USERS,
} from './types';

export const fetchUsers = () => (dispatch) => {
    firebase.database().ref('users').on(
        'value',
        (snapshot) => dispatch({
            type:       FIREBASE_USERS,
            payload:    snapshot,
        })
    );
};

export const fetchWorkflow = (snapshot) => (dispatch) => {
    // change the content workflow data as obtained from backend
    dispatch({
        type:       FIREBASE_WORKFLOW,
        payload:    snapshot,
    });
};

export const userAuth = (user) => (dispatch) => {
    // user can be null in case of logout event
    dispatch({
        type:       FIREBASE_AUTH,
        payload:    user,
    });

    // if user was logged out, nothing more to be done
    if (!user) {
        dispatch({
            type:       FIREBASE_ROLES,
            payload:    null,
        });
        return;
    }

    const { uid, displayName, email, photoURL } = user;

    // get user roles if there are any
    firebase.database().ref(`roles/${uid}`).on(
        'value',
        (snapshot) => dispatch({
            type:       FIREBASE_ROLES,
            payload:    snapshot.val(),
        })
    );

    // save user data on server for future reference
    firebase.database().ref(`users/${uid}`).set(
        { displayName, email, photoURL }
    );
};

export const setWorkflowStatus = (slug, status) => (dispatch, getState) => {
    const { language } = getState();
    const { uid } = firebase.auth().currentUser;
    const value = {
        status,
        uid,
    };
    firebase.database().ref(`status/${language.code}/${slug}`).set(value);
};

export const setWorkflowAgent = (slug, uid) => (dispatch, getState) => {
    const { language } = getState();
    firebase.database().ref(`status/${language.code}/${slug}/uid`).set(uid);
};

/**
 * Initializes authentication workflow. User can sing in using Google account.
 * Returns no action, as Firebase has a listener for authentication state
 * change.
 * @param  {Object} firebase central object used for Firebase auth service.
 * @return {undefined}
 */
export const userSignIn = () => () =>
    firebase.auth().signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
    );

/**
 * Signs out the user. Returns no action, as Firebase has a listener for
 * authentication state change.
 * @param  {Object} firebase central object used for Firebase auth service.
 * @return {undefined}
 */
export const userSignOut = () => () =>
    firebase.auth().signOut();
