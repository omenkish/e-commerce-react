import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCGItDPpffMOs3R5ba3RAbhlvPYC3_5xLY",
  authDomain: "e-commerce-db-7e227.firebaseapp.com",
  databaseURL: "https://e-commerce-db-7e227.firebaseio.com",
  projectId: "e-commerce-db-7e227",
  storageBucket: "",
  messagingSenderId: "108025667282",
  appId: "1:108025667282:web:07b0e32dd4860cf069d70b"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();
  if(!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user :', error.message);
    }
  }

  return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
