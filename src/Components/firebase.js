import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDx0dPNf655APe1xULiJ84Q2SzJHVdUYw0",
  authDomain: "messenger-f1c80.firebaseapp.com",
  projectId: "messenger-f1c80",
  storageBucket: "messenger-f1c80.appspot.com",
  messagingSenderId: "435338085337",
  appId: "1:435338085337:web:3f78b3d8365c4201c64fc8",
  measurementId: "G-QWR4QFK1Y3",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
