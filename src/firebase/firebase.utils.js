import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCe7UOBdlMg121B8T4pSE6lflywqzQEULY",
    authDomain: "as-clothing-e382c.firebaseapp.com",
    databaseURL: "https://as-clothing-e382c.firebaseio.com",
    projectId: "as-clothing-e382c",
    storageBucket: "as-clothing-e382c.appspot.com",
    messagingSenderId: "946830506895",
    appId: "1:946830506895:web:d0b336796d29452a8629fa",
    measurementId: "G-0VBCNGNSZP"
}

export const createUserProfileDocument = async(userAuth,additionalData)=>{
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot =await userRef.get();
    // console.log(snapshot);
    if(!snapshot.exists){
        const {displayName,email} = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('errorr!!',error.message);
        }

    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});//to get google signin prompt

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;