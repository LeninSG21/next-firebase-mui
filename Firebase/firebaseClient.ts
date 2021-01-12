
import firebaseClient from "firebase/app";
import "firebase/auth";

//Code from https://colinhacks.com/essays/nextjs-firebase-authentication

const CLIENT_CONFIG = {} //Add your configuration here


if (typeof window !== "undefined" && !firebaseClient.apps.length) {
    firebaseClient.initializeApp(CLIENT_CONFIG);
    (window as any).firebase = firebaseClient;

}

const doSignOut = () => firebaseClient.auth().signOut()

const doSignIn = (email: string, pwd: string) => firebaseClient.auth().signInWithEmailAndPassword(email, pwd)

const doSignUp = (email: string, pwd: string) => firebaseClient.auth().createUserWithEmailAndPassword(email, pwd)

export { firebaseClient, doSignOut, doSignIn, doSignUp };