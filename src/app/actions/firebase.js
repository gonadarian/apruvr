import firebase from 'firebase';
import { IMPORTANT_STATUSES } from '../consts';
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
    const db = firebase.database();
    const { language, user: { uid } } = getState();

    // save current status and agent
    let value = { uid, status };
    // if current status is important, keep it with the agent that made it
    if (status in IMPORTANT_STATUSES) {
        value = { ...value, [status]: uid };
    }
    db.ref(`status/${language.code}/${slug}`).update(value);

    // keep history of all changes, just in case
    const history = {
        uid,
        status,
        time: firebase.database.ServerValue.TIMESTAMP,
    };
    db.ref(`history/${language.code}/${slug}`).push(history);
};

export const setWorkflowAgent = (slug, uid) => (dispatch, getState) => {
    const db = firebase.database();
    const { language } = getState();

    // save change to the agent, something only advocate is allowed to do
    db.ref(`status/${language.code}/${slug}`).update({ uid });

    // keep this change in history, too
    const history = {
        uid,
        time: firebase.database.ServerValue.TIMESTAMP,
    };
    db.ref(`history/${language.code}/${slug}`).push(history);
};

/**
 * Initializes authentication workflow. User can sing in using Google account.
 * Returns no action, as Firebase has a listener for authentication state
 * change.
 * @return {void}
 */
export const userSignIn = () => () => {
    firebase.auth().signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
    );
};

/**
 * Signs out the user. Returns no action, as Firebase has a listener for
 * authentication state change.
 * @return {void}
 */
export const userSignOut = () => () => {
    firebase.auth().signOut();
};
