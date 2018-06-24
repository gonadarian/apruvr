/* @flow */

const importFirebaseApp = async (): any => {
    const firebaseApp = await import('@firebase/app');
    const firebase = firebaseApp.default;
    if (firebase.apps.length === 0) {
        // initialize firebase
        firebase.initializeApp({
            apiKey:            'AIzaSyBXjOncuS3h9Fz9Boar8t3OcJhiDZL_sgE',
            authDomain:        'apruvr.firebaseapp.com',
            databaseURL:       'https://apruvr.firebaseio.com',
            storageBucket:     'apruvr.appspot.com',
            messagingSenderId: '1081977594498',
        });
    }
    return firebase;
};

export const importFirebaseDatabase = async (onImport: (any) => void) => {
    const firebase = await importFirebaseApp();
    await import('@firebase/database');
    onImport(firebase);
};

export const importFirebaseAuth = async (onImport: (any) => void) => {
    const firebase = await importFirebaseApp();
    await import('@firebase/auth');
    onImport(firebase);
};
