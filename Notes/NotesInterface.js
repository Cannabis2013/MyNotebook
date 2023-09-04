import * as LocalNotes from "./NotesJsonFileStorage"
import * as FirebaseNotes from "./NotesGoogleFirebase"

const storageProvider = FirebaseNotes

export const getAllNotes = async () => await storageProvider.all()
export const removeNoteById = async id => await storageProvider.removeById(id)
export const saveNote = async (title, content, logoUri = "", transferCompleted) => await storageProvider.save(title,content, logoUri, transferCompleted)

