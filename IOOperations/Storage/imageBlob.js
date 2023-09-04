import {createFirebaseApp} from "../../firebaseConfig";
import {getDownloadURL, getStorage, ref, uploadBytes} from "@firebase/storage";

const app = createFirebaseApp()
const storage = getStorage(app)

const fetchAlternative = async (uri) => await fetch(uri)
const fetchBlob = async (uri) => {
    return await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
    });
};


const upload = async (fileBlob, taskFailed, taskCompleted) => {
    const imgName = "img-" + new Date().getTime();
    const storageRef = ref(storage,`images/${imgName}.jpg`)
    const metadata = {
        contentType: "image/jpeg",
    };
    uploadBytes(storageRef, fileBlob).then((snapshot) => {
        getDownloadURL(snapshot.ref)
            .then(uri => taskCompleted(uri))
    });
}

export const uploadToStorage = async (uri, errorHandler, completeHandler) => {
    const blob = await fetchBlob(uri)
    await upload(blob,errorHandler,completeHandler)
}