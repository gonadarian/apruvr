/* @flow */
import firebase from 'firebase';
import type { ActionType, UserType, WorkflowMapType } from '../flows';
import type { StateType } from '../reducers';
import { IMPORTANT_STATUSES } from '../consts';
import {
    FIREBASE_WORKFLOW,
    FIREBASE_AUTH,
    FIREBASE_ROLES,
    FIREBASE_USERS,
} from './types';

export const fetchUsers = (): ActionType => (dispatch: Dispatch) => {
    firebase.database().ref('users').on(
        'value',
        (snapshot: UserType[]): void => dispatch({
            type:       FIREBASE_USERS,
            payload:    snapshot,
        })
    );
};

export const fetchWorkflow = (snapshot: WorkflowMapType): ActionType => (dispatch: Dispatch) => {
    // change the content workflow data as obtained from backend
    dispatch({
        type:       FIREBASE_WORKFLOW,
        payload:    snapshot,
    });
};

export const userAuth = (user: ?UserType): ActionType => (dispatch: Dispatch) => {
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
        (snapshot: { val: () => string }): void => dispatch({
            type:       FIREBASE_ROLES,
            payload:    snapshot.val(),
        })
    );
    // save user data on server for future reference
    firebase.database().ref(`users/${uid}`).set(
        { displayName, email, photoURL }
    );
};

export const setWorkflowStatus = (slug: string, status: string): ActionType =>
    (dispatch: Dispatch, getState: () => StateType) => {
        const db = firebase.database();
        const { language, user } = getState();
        if (!language || !user) {
            console.error('Can not set workflow status if language or user are not set.', slug, status);
            return;
        }
        const uid = user.uid;
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

export const setWorkflowAgent = (slug: string, uid: string): ActionType =>
    (dispatch: Dispatch, getState: () => StateType) => {
        const db = firebase.database();
        const { language } = getState();
        if (!language) {
            console.error('Can not set workflow agent if language is not set.', slug, uid);
            return;
        }
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
export const userSignIn = (): ActionType => () => {
    firebase.auth().signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
    );
};

/**
 * Signs out the user. Returns no action, as Firebase has a listener for
 * authentication state change.
 * @return {void}
 */
export const userSignOut = (): ActionType => () => {
    firebase.auth().signOut();
};
