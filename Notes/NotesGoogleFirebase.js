import * as Firestore from "@firebase/firestore";
import {initFirestore} from "../firebaseConfig";

const collectionName = "UserNotes"
const documentId = "xrpuofni"
const fStore = initFirestore()
export const clear = async () => true

export const all = async () => {
    return []
}

export const removeById = async id => {
    // Implement me
    return true
}

export const save = async (title, content, logoUri = "") => {
    const colRef = await Firestore.collection(fStore,collectionName).doc(documentId)
    console.log(colRef)
    return true
}