/* @flow */
/* eslint-disable no-inline-comments */

export const importFirebaseDatabase = async (onImport) => {
    const firebase = await import(/* webpackChunkName: "firebase-app" */ '@firebase/app');
    await import(/* webpackChunkName: "firebase-database" */ '@firebase/database');
    onImport(firebase.default);
};

export const importFirebaseAuth = async (onImport) => {
    const firebase = await import(/* webpackChunkName: "firebase-app" */ '@firebase/app');
    await import(/* webpackChunkName: "firebase-auth" */ '@firebase/auth');
    onImport(firebase.default);
};
