import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBCv4sCE5zYm9fAEWnLJ0NAoTozO7zdB9g",
    authDomain: "cerdasberwawasan-2b7f5.firebaseapp.com",
    projectId: "cerdasberwawasan-2b7f5",
    storageBucket: "cerdasberwawasan-2b7f5.firebasestorage.app",
    messagingSenderId: "383586873859",
    appId: "1:383586873859:web:2c12e0ceddc9bc1cf19436",
    measurementId: "G-RCWM1BQPDF"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database }; 