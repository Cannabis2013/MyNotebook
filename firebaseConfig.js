import { initializeApp } from 'firebase/app';
import {getFirestore} from "@firebase/firestore";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

export const initFirestore = () => {
    // Initialize Firebase
    console.log("Firebase config called")
    const firebaseConfig = {
        apiKey: 'AIzaSyDE0OpL5SzRpClCJE4jcAyT8JQFgbqIO1s',
        authDomain: 'mynotebook-d9b39.firebaseapp.com',
        databaseURL: 'https://project-id.firebaseio.com',
        projectId: 'mynotebook-d9b39',
        storageBucket: 'mynotebook-d9b39.appspot.com',
        messagingSenderId: '15468578934-uvo1rs0q8q4vfd32ave4l4mqbeq5ijoa.apps.googleusercontent.com',
        appId: '1:15468578934:android:8b19a424343438424a7757',
        measurementId: 'G-measurement-id',
    };

    const app = initializeApp(firebaseConfig);
    // For more information on how to access Firebase in your project,
    // see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
    return  getFirestore()
}
