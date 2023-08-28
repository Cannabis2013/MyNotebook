import * as LocalNotes from "./NotesJsonFileStorage"
import * as FirebaseNotes from "./NotesGoogleFirebase"

const storageProvider = FirebaseNotes

// For reset purposes. Not used in code
export const clearNotes = async () => await storageProvider.clear()

export const getAllNotes = async () => await storageProvider.all() 

export const removeNoteById = async id => await storageProvider.removeById(id)

export const saveNote = async (title, content, logoUri = "") => await storageProvider.save(title,content, logoUri)

