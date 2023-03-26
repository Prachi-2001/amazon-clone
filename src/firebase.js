
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
  // Add your Firebase project's API keys here
    apiKey: "AIzaSyAwaD8Xv6R7IL6j2jxLvBubuVhfUy_XlfU",
  authDomain: "clone-606ca.firebaseapp.com",
  projectId: "clone-606ca",
  storageBucket: "clone-606ca.appspot.com",
  messagingSenderId: "992067871985",
  appId: "1:992067871985:web:edf1af3275b91f30a13550",
  measurementId: "G-D74L9YFDXM"
};

// initialise app
const firebaseapp = firebase.initializeApp(firebaseConfig);

// intializing our app to the firestore database 
const db = firebaseapp.firestore();

// // this give  avariable that we can actually handle and sign in with taht
const auth = firebase.auth();

export {db, auth}; 

export default firebase;