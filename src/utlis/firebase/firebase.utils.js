import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {doc, getDoc, getFirestore, setDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBHfl4q0JMvHdTr6Q7CI3pLOAMU9WlLMk0",
    authDomain: "crownclothing-73552.firebaseapp.com",
    projectId: "crownclothing-73552",
    storageBucket: "crownclothing-73552.appspot.com",
    messagingSenderId: "416428473633",
    appId: "1:416428473633:web:8bb80b570601b9444c5260",
    measurementId: "G-EN1BJTRXH0"
};


const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (e) {
            console.log('error creating the user ')
        }
    }

    return userDocRef;
}