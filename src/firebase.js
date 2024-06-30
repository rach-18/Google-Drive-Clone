import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA4T3TSMBUBwTIE6Y2dqPdMMQqOqBqzZCI",
    authDomain: "drive-clone-7333a.firebaseapp.com",
    projectId: "drive-clone-7333a",
    storageBucket: "drive-clone-7333a.appspot.com",
    messagingSenderId: "24378395176",
    appId: "1:24378395176:web:de7053e8bbcd73cfa8c31d"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {db, storage, auth, provider}
