import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storage: process.env.NEXT_PUBLIC_FIREBASE_STORAGE,
    message: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const appFirebase = initializeApp(firebaseConfig)
export const auth = getAuth(appFirebase)
export const storageFirebase = getFirestore(appFirebase)
export const authFirebase = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
}