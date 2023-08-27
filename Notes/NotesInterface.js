import * as LocalNotes from "./NotesJsonFileStorage"
import * as FirebaseNotes from "./NotesGoogleFirebase"
const Notes = FirebaseNotes

// For reset purposes. Not used in code
export const clearNotes = async () => await Notes.clear()

export const getAllNotes = async () => await Notes.all() 

export const removeNoteById = async id => await Notes.removeById(id)

export const saveNote = async (title, content, logoUri = "") => await Notes.save(title,content, logoUri)

