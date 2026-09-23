import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer, setDoc, getDoc, updateDoc, collection, getDocs } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Firestore
// Use the configured firestoreDatabaseId if provided, or default
export const db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Connection test helper per skill requirement
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    // Attempt a light server query
    await getDocFromServer(doc(db, 'system', 'connection_test'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase offline or network unreachable:', error.message);
      return false;
    }
    // Any permission or missing doc response confirms live connectivity
    return true;
  }
}

// User Profile Sync Helper
export async function syncUserProfileToFirestore(user: {
  id: string;
  name: string;
  email: string;
  provider: string;
  role: string;
  institution?: string;
}) {
  try {
    const userDocRef = doc(db, 'users', user.id);
    await setDoc(
      userDocRef,
      {
        ...user,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (err) {
    console.warn('Firestore user sync fallback:', err);
  }
}

// Learner Progress Sync Helper
export async function syncProgressToFirestore(userId: string, progress: Record<string, any>) {
  try {
    const progressDocRef = doc(db, 'progress', userId);
    await setDoc(
      progressDocRef,
      {
        userId,
        ...progress,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (err) {
    console.warn('Firestore progress sync fallback:', err);
  }
}
