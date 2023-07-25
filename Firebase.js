import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";
import { getFirestore} from "firebase/firestore"

  const firebaseConfig = {
    apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_APIKEY}`,
    authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN}`,
    projectId: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECTID}`,
    storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET}`,
    databaseURL: `${process.env.NEXT_PUBLIC_FIREBASE_DATABASEURL}`,
    messagingSenderId: `${process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID}`,
    appId: `${process.env.NEXT_PUBLIC_FIREBASE_APPID}`
  };

const app = initializeApp(firebaseConfig);


export default app;
export const db = getFirestore(app);
export const authentication = getAuth(app);
export const storage = getStorage(app);