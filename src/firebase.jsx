// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRTaEbIHMgo8iaJRhrRWM939-P_Kks0vs",
  authDomain: "optitrack-742a4.firebaseapp.com",
  databaseURL: "https://optitrack-742a4-default-rtdb.firebaseio.com",
  projectId: "optitrack-742a4",
  storageBucket: "optitrack-742a4.appspot.com",
  messagingSenderId: "177909874205",
  appId: "1:177909874205:web:9169cdbdfb94eb4c75d0f4",
  measurementId: "G-YF67TK0LQ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
