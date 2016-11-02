import axios from 'axios';
import {
    CHANGE_LANGUAGE,
    FETCH_NODES,
    FILTER_CONTENT_KIND,
    FILTER_TOPIC,
    FILTER_VISIBIITY,
    FIREBASE_FETCH_ONCE,
    FIREBASE_AUTH,
} from './types';

const API_TRANSLATE_NOW = 'https://www.khanacademy.org/api/internal/translate_now?';

/**
 * Action for fetching Khan Academy content from their internal API.
 * @param  {Object} language structure containing language name and code.
 * @return {Object}          Redux action.
 */
const fetchNodes = (language) => ({
    type:       FETCH_NODES,
    payload:    axios.get(`${API_TRANSLATE_NOW}lang=${language.code}`),
});

/**
 * Action for changing the language in the state.
 * @param  {Object} language structure containing language name and code.
 * @return {Object}          Redux action.
 */
const changeLanguage = (language) => ({
    type:       CHANGE_LANGUAGE,
    payload:    language,
});

/**
 * Activated by the user. Triggers other actions, does nothing by itself.
 * @param  {Object} language structure containing language name and code.
 * @return {undefined}
 */
export const chooseLanguage = (language) => (dispatch) => {
    dispatch(changeLanguage(language));
    dispatch(fetchNodes(language));
};

export const filterContentKind = (contentKind) => ({
    type:       FILTER_CONTENT_KIND,
    payload:    contentKind,
});

export const filterTopic = (topic) => ({
    type:       FILTER_TOPIC,
    payload:    topic,
});

export const filterVisibility = (key) => ({
    type:       FILTER_VISIBIITY,
    payload:    key,
});

export const firebaseFetchOnce = (snapshot) => ({
    type:       FIREBASE_FETCH_ONCE,
    payload:    snapshot,
});

/**
 * Sets user session object to the store.
 * @param  {firebase.User} user session object
 * @return {Object}      Redux action.
 */
export const firebaseAuth = (user) => ({
    type:       FIREBASE_AUTH,
    payload:    user,
});

export const firebaseSetStatus = (firebase, language, slug, status) => () => {
    const user = firebase.auth().currentUser;
    const value = {
        status,
        agent: {
            name:   user.displayName,
            email:  user.email,
        },
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
export const firebaseSignIn = (firebase) => () =>
    firebase.auth().signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
    );

/**
 * Signs out the user. Returns no action, as Firebase has a listener for
 * authentication state change.
 * @param  {Object} firebase central object used for Firebase auth service.
 * @return {undefined}
 */
export const firebaseSignOut = (firebase) => () =>
    firebase.auth().signOut();
