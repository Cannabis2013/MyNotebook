import {initFirestore} from "../firebaseConfig";
import {addDoc, collection, deleteDoc, getDocs, getFirestore} from "@firebase/firestore/lite";

const app = initFirestore()
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

export const save = async (title, content, logoUri = "") => {
    const colRef = collection(db,colletionName)
    const docsRef = await getDocs(colRef)
    await addDoc(colRef, createItem(title,content,logoUri))
        .catch(err => console.log(err))
    return true
}