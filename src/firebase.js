import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDamlVoNdLIVnldQtvseUFyML07lBvAtos",
	authDomain: "links-crud-2f2ea.firebaseapp.com",
	projectId: "links-crud-2f2ea",
	storageBucket: "links-crud-2f2ea.appspot.com",
	messagingSenderId: "314964250888",
	appId: "1:314964250888:web:6bfc858911351f59985cbd",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const db = app.firestore();
