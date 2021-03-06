/* @flow */
import { includes } from 'lodash';
import { importFirebaseAuth, importFirebaseDatabase } from '../imports';
import type { ActionType, Dispatch, GetState, UserType, WorkflowMapType } from '../flows';
import { IMPORTANT_STATUSES, type LanguageType } from '../consts';
import {
    FIREBASE_WORKFLOW, FIREBASE_AUTH, FIREBASE_ROLES,
    FIREBASE_USERS, FIREBASE_HISTORY, FIREBASE_DURATIONS, FETCH_NODES,
} from './types';

export const fetchUsers = (): ActionType =>
    (dispatch: Dispatch) => {
        importFirebaseDatabase((firebase) => {
            const db = firebase.database();
            db.ref('users').on(
                'value',
                (snapshot: {val: () => UserType[]}) => dispatch({
                    type:    FIREBASE_USERS,
                    payload: snapshot,
                })
            );
        });
    };

export const fetchDurations = (): ActionType =>
    (dispatch: Dispatch) => {
        importFirebaseDatabase((firebase) => {
            const db = firebase.database();
            db.ref('videos').once(
                'value',
                (snapshot: { val: () => { [string]: number } }) => dispatch({
                    type:    FIREBASE_DURATIONS,
                    payload: snapshot.val(),
                })
            );
        });
    };

export const fetchWorkflow = (snapshot: WorkflowMapType): ActionType =>
    (dispatch: Dispatch) => {
        // change the content workflow data as obtained from backend
        dispatch({
            type:    FIREBASE_WORKFLOW,
            payload: snapshot,
        });
    };

export const fetchHistory = (slug: string): ActionType =>
    (dispatch: Dispatch, getState: GetState) => {
        const { language } = getState();
        if (!language) {
            throw new Error(`Language is not set [${slug}]`);
        }
        dispatch({
            type:    FIREBASE_HISTORY,
            payload: { slug },
        });
        importFirebaseDatabase((firebase) => {
            const db = firebase.database();
            db.ref(`history/${language.code}/${slug}`).on(
                'value',
                (snapshot: { val: () => UserType[] }): void => dispatch({
                    type:    FIREBASE_HISTORY,
                    payload: { slug, snapshot },
                })
            );
        });
    };

export const fetchNodes = (language: LanguageType): ActionType =>
    (dispatch: Dispatch) => {
        if (!language) {
            dispatch({
                type:    FETCH_NODES,
                payload: null,
            });
            return;
        }
        importFirebaseDatabase((firebase) => {
            const db = firebase.default.database();
            db.ref(`translation/${language.code}`).on(
                'value',
                (snapshot): void => dispatch({
                    type:    FETCH_NODES,
                    payload: snapshot,
                })
            );
        });
    };

export const userAuth = (user: ?UserType): ActionType =>
    (dispatch: Dispatch) => {
        // user can be null in case of logout event
        dispatch({
            type:    FIREBASE_AUTH,
            payload: user,
        });
        // if user was logged out, nothing more to be done
        if (!user) {
            return;
        }
        // added to capture non-null type information needed in below code
        const loggedInUser = user;
        // call logice depndent on dynamically imported firebase library
        importFirebaseDatabase((firebase) => {
            const db = firebase.database();
            const { uid, displayName, email, photoURL } = loggedInUser;
            // get user roles if there are any
            db.ref(`roles/${uid}`).on(
                'value',
                (snapshot: { val: () => string }): void => dispatch({
                    type:    FIREBASE_ROLES,
                    payload: snapshot.val(),
                })
            );
            // save user data on server for future reference
            db.ref(`users/${uid}`).set(
                { displayName, email, photoURL }
            );
        });
    };

export const setWorkflowStatus = (slug: string, status: string): ActionType =>
    (dispatch: Dispatch, getState: GetState) => {
        const { language, user, roles } = getState();
        if (!language || !user) {
            throw new Error(`Language or user are not set [${slug}, ${status}]`);
        }
        const { uid } = user;
        // save current status and agent
        let value = { status };
        // allow advocates to change status w/o assigning it to themselves
        if (!includes(roles, 'advocate')) {
            value = { ...value, uid };
        }
        // if current status is important, keep it with the agent that made it
        if (status in IMPORTANT_STATUSES) {
            value = { ...value, [status]: uid };
        }
        importFirebaseDatabase((firebase) => {
            const db = firebase.database();
            db.ref(`status/${language.code}/${slug}`).update(value);
            // keep history of all changes, just in case
            let history = {
                by:   uid,
                time: firebase.database.ServerValue.TIMESTAMP,
                status,
            };
            // again, advocates do not automatically change assignments
            if (!includes(roles, 'advocate')) {
                history = { ...history, uid };
            }
            db.ref(`history/${language.code}/${slug}`).push(history);
        });
    };

export const setWorkflowAgent = (slug: string, uid: string): ActionType =>
    (dispatch: Dispatch, getState: GetState) => {
        const { language, user } = getState();
        if (!language || !user) {
            throw new Error(`Languagee or user are not set [${slug}, ${uid}]`);
        }
        importFirebaseDatabase((firebase) => {
            const db = firebase.database();
            // save change to the agent, something only advocate is allowed to do
            db.ref(`status/${language.code}/${slug}`).update({ uid });
            // keep this change in history, too
            const history = {
                by:   user.uid,
                time: firebase.database.ServerValue.TIMESTAMP,
                uid,
            };
            db.ref(`history/${language.code}/${slug}`).push(history);
        });
    };

/**
 * Initializes authentication workflow. User can sing in using Google account.
 * Returns no action, as Firebase has a listener for authentication state
 * change.
 * @return {void}
 */
export const userSignIn = (): ActionType =>
    () => {
        importFirebaseAuth((firebase) => {
            firebase.auth().signInWithPopup(
                new firebase.auth.GoogleAuthProvider()
            );
        });
    };

/**
 * Signs out the user. Returns no action, as Firebase has a listener for
 * authentication state change.
 * @return {void}
 */
export const userSignOut = (): ActionType =>
    () => {
        importFirebaseAuth((firebase) => {
            firebase.auth().signOut();
        });
    };
