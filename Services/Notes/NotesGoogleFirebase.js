import { getFirebaseApp } from "../../firebaseConfig";
import { addDoc, collection, deleteDoc, getDocs, getFirestore, query, where } from "@firebase/firestore/lite";
import { uploadToStorage } from "../Camera/imageBlob";
import { userInfo } from "../Auth/notesAuth"

const app = getFirebaseApp()
const db = getFirestore(app)

const colletionName = 'UserNotes'

function createItem(noteObject, userId, images) {
    return {
        title: noteObject.title,
        content: noteObject.content,
        latitude: noteObject.location?.latitude ?? 0,
        longitude: noteObject.location?.longitude ?? 0,
        images,
        userId
    }
}

export const clear = async () => true

export async function all() {
    const user = userInfo()
    const colRef = collection(db, colletionName)
    const q = query(colRef, where("userId", "==", user.uid))
    const docsRef = await getDocs(q)
    const fetched = []
    docsRef.forEach(doc => {
        const note = doc.data()
        note.id = doc.id
        fetched.push(note)
    })
    return fetched
}

export async function removeById(id) {
    const colRef = collection(db, colletionName)
    const docsRef = (await getDocs(colRef)).docs
    const docRef = docsRef.find(doc => doc.id === id)
    return await deleteDoc(docRef.ref)
        .catch(err => {
            console.log(err)
            return false
        })
}

async function saveToDb(note) {
    const colRef = collection(db, colletionName)
    await addDoc(colRef, note)
        .catch(err => {
            console.log(err)
            return false
        })
    return true
}

function errorHandler(err) {
    console.log(err)
}

export async function save(noteObject) {
    const images = await uploadToStorage(noteObject.images)
    const note = createItem(noteObject, userInfo().uid, images)
    return saveToDb(note)
}
