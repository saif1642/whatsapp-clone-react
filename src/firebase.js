import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDs9DLTQwQZLlBUXUhfrTT5LZtcrPIhWKo",
    authDomain: "whatsapp-clone-d24d3.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-d24d3.firebaseio.com",
    projectId: "whatsapp-clone-d24d3",
    storageBucket: "whatsapp-clone-d24d3.appspot.com",
    messagingSenderId: "304007215060",
    appId: "1:304007215060:web:4f750b0cb9510e2007c841",
    measurementId: "G-3BNNQFZJ0C"
});
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;