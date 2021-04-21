import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC595RHbs8tiywdkV-Ikq-6L3-T3D8PTi0",
    authDomain: "ecommerce-db-a415d.firebaseapp.com",
    projectId: "ecommerce-db-a415d",
    storageBucket: "ecommerce-db-a415d.appspot.com",
    messagingSenderId: "795668755251",
    appId: "1:795668755251:web:bc8940a861b6dbd34f8446",
    measurementId: "G-ZQRXRBBKNQ"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;