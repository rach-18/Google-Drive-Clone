import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA4T3TSMBUBwTIE6Y2dqPdMMQqOqBqzZCI",
    authDomain: "drive-clone-7333a.firebaseapp.com",
    projectId: "drive-clone-7333a",
    storageBucket: "drive-clone-7333a.appspot.com",
    messagingSenderId: "24378395176",
    appId: "1:24378395176:web:de7053e8bbcd73cfa8c31d"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export { db, storage, auth, provider, signInWithPopup };
