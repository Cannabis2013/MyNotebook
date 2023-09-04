import {createFirebaseApp} from "../firebaseConfig";
import {addDoc, collection, deleteDoc, getDocs, getFirestore} from "@firebase/firestore/lite";
import {uploadToStorage} from "../IOOperations/Storage/imageBlob";


const app = createFirebaseApp()
const db = getFirestore(app)

const colletionName = 'UserNotes'

const createItem = (title, content, logoUri = "") => {
    return {
        title,
        content,
        logoUri
    }
}

export const clear = async () => true

export const all = async () => {
    const colRef = collection(db,colletionName)
    const docsRef = await getDocs(colRef)
    let notes = []
    docsRef.forEach(doc => {
        const note = doc.data()
        note.id = doc.id
        notes.push(note)
    })
    return notes
}

export const removeById = async id => {
    // Implement me
    const colRef = collection(db,colletionName)
    const docsRef = (await getDocs(colRef)).docs
    const docRef = docsRef.find(doc => doc.id === id)
    return await deleteDoc(docRef.ref)
        .catch(err => {
            console.log(err)
            return false
        })
}

export const save = async (title, content, logoUri = "", completedRef) => {
     await uploadToStorage(logoUri,() => {}, async (uri) => {
        const colRef = collection(db,colletionName)
        await addDoc(colRef, createItem(title,content,uri))
            .catch(err => console.log(err))
         completedRef()
    })
}