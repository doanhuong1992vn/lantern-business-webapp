import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAAE9iy4BhjXRdhjt76iRRfdprNVUUzED8",
    authDomain: "lantern-business-webapp-586b8.firebaseapp.com",
    projectId: "lantern-business-webapp-586b8",
    storageBucket: "lantern-business-webapp-586b8.appspot.com",
    messagingSenderId: "766116628180",
    appId: "1:766116628180:web:bc7f82cd02ce28573c5d41"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
