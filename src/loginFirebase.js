import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCdAO7J32HZGTUH2u2MJ54gDGn820RMY54",
  authDomain: "hungruheist.firebaseapp.com",
  projectId: "hungruheist",
  storageBucket: "hungruheist.appspot.com",
  messagingSenderId: "81863539061",
  appId: "1:81863539061:web:298495b638e62f14fd7b3c",
  measurementId: "G-D92P4WCRCD",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider, signOut, getAuth };
