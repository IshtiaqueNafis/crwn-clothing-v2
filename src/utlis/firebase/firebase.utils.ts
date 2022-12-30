import {initializeApp} from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    NextOrObserver,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    signOut,
    User,
} from "firebase/auth";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    QueryDocumentSnapshot,
    setDoc,
    where,
    writeBatch
} from "firebase/firestore";
import {categories} from "../../entity/models";


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
export const user = auth.currentUser;
//region ***googleprovider***
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)
export const db = getFirestore();
//endregion


export type AdditionalInformation = {
    displayName?: string
}

export type  UserData = {
    createdAt: Date;
    displayName: string;
    email: string

};


export const createUserDocumentFromAuth = async (userAuth: User, additionalInformation = {} as AdditionalInformation)
    : Promise<void | QueryDocumentSnapshot<UserData>> => {


    const userDocRef = doc(db, 'users', userAuth.uid);


    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error creating the user', error);
        }
    }

    return userSnapshot as QueryDocumentSnapshot<UserData>;

};


// export const getDataFromSnapshot = async (userDocRef) => {
//     return (await getDoc(userDocRef)).data();
//
//
// }
export const retrieveDocumentFromDatabase = async (uid: string) => {
    const userDocRef = doc(db, 'users', uid);
    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
        return undefined;
    }
    return userSnapshot.data();


}

export const signInAuthWithEmailAndPassword = async (email: string, password: string) => {

    try {
        return await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        throw e;
    }
}


export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {

    if (!email || !password) {
        return;
    }
    return createUserWithEmailAndPassword(auth, email, password)
};

export const signOutUser = () => signOut(auth);

export const onAuthStateChangeListener = (callback: NextOrObserver<User>) => {
    return onAuthStateChanged(auth, callback);

}

//region *** addCollectionDocuments -->seed firebase data ***

export type ObjectToAdd = {
    title: string
};


export const addCollectionDocuments = async <T extends ObjectToAdd>(collectionKey: string, objectsToAdd: T[]): Promise<void> => {
    const collectionRef = collection(db, collectionKey); // db is the firestore, collectionKey is for the name of the database name.
    const batch = writeBatch(db); // pass the firestore.

    for (const object of objectsToAdd) {
        const docRef = doc(collectionRef, object.title.toLowerCase()); // get the object reference.
        batch.set(docRef, object);
    }
    await batch.commit();

}
//endregion

export const getCategoriesAndDocuments = async (category = "All"): Promise<categories[]> => {

    const collectionRef = collection(db, "categories");
    let q = null;
    if (category !== "All") {
        const categorySearchTerm = category.charAt(0).toUpperCase() + category.slice(1); // lowercase letter
        q = query(collection(db, "categories"), where("title", "==", categorySearchTerm))
    } else {
        q = query(collectionRef);
    }


    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => (doc.data() as categories));
}

export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const unSubscribe = onAuthStateChanged(
            auth,
            userAuth => {
                unSubscribe();
                resolve(userAuth);
            }, reject
        );
    })
}