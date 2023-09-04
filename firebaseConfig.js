import "firebase/compat/storage"
import {initializeApp} from "firebase/app";

let app = undefined

export const createFirebaseApp = () => {
    if(app)
        return app
    // Initialize Firebase
    const firebaseConfig = {
        databaseURL: 'https://mynotebook-b0a5b.firebaseio.com',
        apiKey: "AIzaSyB_Nfq9BCmOO6QWCgJcRLNTqE3oZNs9N48",
        authDomain: "mynotebook-b0a5b.firebaseapp.com",
        projectId: "mynotebook-b0a5b",
        storageBucket: "mynotebook-b0a5b.appspot.com",
        messagingSenderId: "1020688796627",
        appId: "1:1020688796627:web:afd791b0f67ceace183d26"
    };
    app = initializeApp(firebaseConfig);
    return app
    // For more information on how to access Firebase in your project,
    // see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
}
