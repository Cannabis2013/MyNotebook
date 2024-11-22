import "firebase/compat/storage"
import { initializeApp } from "firebase/app";
import { getStorage } from "@firebase/storage";
let app = undefined

export function getFirebaseApp () {
    if (app)
        return app
    const firebaseConfig = {
        apiKey: "AIzaSyAArLQ5T06MjjSzZXjeDp_FpwXCIJLdenM",
        authDomain: "mynotebook-6e40c.firebaseapp.com",
        projectId: "mynotebook-6e40c",
        storageBucket: "gs://mynotebook-6e40c.appspot.com",
        messagingSenderId: "874195159834",
        appId: "1:874195159834:web:3d9affc4b36f2aa434faa3"
    };
    app = initializeApp(firebaseConfig);
    return app
}

export function getStorageReference(){
    const app = getFirebaseApp()
    return getStorage(app)
}