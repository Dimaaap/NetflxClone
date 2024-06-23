import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZ4oGDk0PKUDvyvr7ePY3293UY-3wyVyA",
  authDomain: "netflixclone-f9e34.firebaseapp.com",
  projectId: "netflixclone-f9e34",
  storageBucket: "netflixclone-f9e34.appspot.com",
  messagingSenderId: "188027638265",
  appId: "1:188027638265:web:57c5700a21c7da2f80ad28"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signup = async (name, email, password) => {
    try{
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch(error){
        console.log(error);
        alert(error);
    }
}

const login = async (email, password) => {
    try{
        await signInWithEmailAndPassword(auth, email, password);
    } catch(error){
        console.log(error)
        alert(error);
    }
}

const logout = async () => {
    signOut(auth);
}

export {auth, db, login, signup, logout};