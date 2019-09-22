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

};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log('This is the collectionRef :', collectionRef);

  const batch = firestore.batch();
  // Ensures they all get saved to the db, else none is saved
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });
  
  return await batch.commit()

};

export const convertCollectionSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map( doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });
  return transformedCollection.reduce( (accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
