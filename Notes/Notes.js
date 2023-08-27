import * as FileSystem from "expo-file-system"

const FILEPATH = `${FileSystem.documentDirectory}notes.json`

import { v4 as Uuid } from 'uuid';

const initialData = [
    {
        title: "Fysik noter",
        content: "Gud spiller ikke terninger",
        id: Uuid()
    },
    {
        title: "Matematik noter",
        content: "i^2 = -1",
        id: Uuid()
    },
    {
        title:"Historie noter",
        content: "Kong Volmer var konge i 1433",
        id: Uuid()
    }
]

// For reset purposes. Not used in code
export const clearNotes = async () => {
    await FileSystem.deleteAsync(FILEPATH)
}

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
        console.log(err)
        return await persistNotes() ? initialData : []
    })
    return JSON.parse(data)
}

const createItem = (title, content) => {
    return {
        title,
        content,
        id : Uuid()
    }
}

export const getAllNotes = async () => await fetchNotes()

export const removeNoteById = async id => {
    const notes = await fetchNotes()
    const filtered = notes.filter(n => n.id !== id)
    await persistNotes(filtered)
}

export const saveNote = async (title, content, imageUri = "") => {
    const data = await fetchNotes()
    const item = createItem(title,content)
    console.log(item)
    data.push(item)
    console.log(data)
    return persistNotes(data)
}

