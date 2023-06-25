import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../lib/firebase.config";

const provider = new GoogleAuthProvider();

const FirebaseAuth = {
  signIn: () => {
    return new Promise(async (resolve) => {
      try {
        const response = await signInWithPopup(auth, provider);
        resolve(response.user);
      } catch (error) {
        console.error(error);
      }
    });
  },
  signOut: async () => {
    try {
      const response = await signOut(auth);
      console.log(response);
      console.log("User signed out");
    } catch (error) {
      console.error(error);
    }
  },
  getCurrentUser: () => {
    return new Promise((resolve) => {
      return auth.onAuthStateChanged(resolve);
    });
  },
};

export default FirebaseAuth;
