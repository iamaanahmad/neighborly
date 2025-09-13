import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: 'studio-8690552426-bc4ba',
  appId: '1:272798353468:web:04791f0f4b3edb4b64db39',
  storageBucket: 'studio-8690552426-bc4ba.firebasestorage.app',
  apiKey: 'AIzaSyATbCodZozqSv3QYNWDDcqK3f1ZZNrGWWo',
  authDomain: 'studio-8690552426-bc4ba.firebaseapp.com',
  messagingSenderId: '272798353468',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
