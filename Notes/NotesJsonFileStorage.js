import * as FileSystem from "expo-file-system"

const FILEPATH = `${FileSystem.documentDirectory}notes.json`

import { v4 as Uuid } from 'uuid';

const initialData = [
    {
        title: "Fysik noter",
        content: "Gud spiller ikke terninger",
        logoUri: "",
        id: Uuid()
    },
    {
        title: "Matematik noter",
        content: "i^2 = -1",
        logoUri: "",
        id: Uuid()
    },
    {
        title:"Historie noter",
        logoUri: "",
        content: "Kong Volmer var konge i 1433",
        id: Uuid()
    }
]
const persistNotes = async (notes = undefined) => {
    const data = notes ? notes : initialData
    await FileSystem.writeAsStringAsync(FILEPATH, JSON.stringify(data))
        .catch(err => {
            console.log(err)
            return false
        })
    return true
}

const fetchNotes = async () => {
    const data = await FileSystem.readAsStringAsync(FILEPATH).catch(async err => {
        return await persistNotes() ? initialData : []
    })
    return JSON.parse(data)
}

const createItem = (title, content, logoUri = "") => {
    return {
        title,
        content,
        logoUri,
        id : Uuid()
    }
}

// For reset purposes. Not used in code
export const clear = async () => {
    await FileSystem.deleteAsync(FILEPATH)
}

export const all = async () => await fetchNotes()

export const removeById = async id => {
    const notes = await fetchNotes()
    const filtered = notes.filter(n => n.id !== id)
    await persistNotes(filtered)
}

export const save = async (title, content, logoUri = "") => {
    const data = await fetchNotes()
    const item = createItem(title,content,logoUri)
    data.push(item)
    return persistNotes(data)
}

