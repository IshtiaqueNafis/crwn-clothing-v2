import {initializeApp} from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import {doc, getDoc, getFirestore, setDoc,collection,writeBatch} from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBHfl4q0JMvHdTr6Q7CI3pLOAMU9WlLMk0",
    authDomain: "crownclothing-73552.firebaseapp.com",
    projectId: "crownclothing-73552",
    storageBucket: "crownclothing-73552.appspot.com",
    messagingSenderId: "416428473633",
    appId: "1:416428473633:web:8bb80b570601b9444c5260",
    measurementId: "G-EN1BJTRXH0"
};


export const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth();

//region ***googleprovider***
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)
export const db = getFirestore();
//endregion

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (e) {
            console.log('error creating the user ')
        }
    }

    return userSnapshot.data();
}

export const signInAuthWithEmailAndPassword = async (email, password) => {

    try {
        return await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        console.log(e);
        throw e.message;
    }
}


export const createAuthUserWithEmailAndPassword = async (email, password) => {

    if (!email || !password) {
        return;
    }
    return createUserWithEmailAndPassword(auth, email, password)
};

export const signOutUser =  () =>  signOut(auth);

export const onAuthStateChangeListener = (callback) =>{
    onAuthStateChanged(auth, callback);

}

//region *** addCollectionDocuments -->seed firebase data ***
export const addCollectionDocuments = async (collectionKey,objectsToAdd)=>{
    const collectionRef = collection(db, collectionKey); // db is the firestore, collectionKey is for the name of the database name.
    const batch = writeBatch(db); // pass the firestore.

    for (const object of objectsToAdd) {
        const docRef = doc(collectionRef,object.title.toLowerCase()); // get the object reference.
        batch.set(docRef, object);
    }
    await batch.commit();

}
//endregion