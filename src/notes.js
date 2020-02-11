import moment from 'moment'
import uuidv4 from 'uuid/v4'

let notes = []

// Read existing notes from localstorage step 1
const loadNotes = () => {
    const notesJSON = localStorage.getItem('notes');

    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch (error) {
        return []
    }
}

// Save the notes on localstorage step 2
const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// Expose notes from module
const getNotes = () => notes

// Create note
const createNote = () => {
    const id = uuidv4()
    const timestamp = moment().valueOf()

    notes.push({
        id: id,
        title: '',
        body: '',
        createdAt: timestamp,
        upDateAt: timestamp
    })
    saveNotes()
}

// Remove a note from the list
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
        saveNotes()
    }
}

// Sort your notes by one of three ways
const sortNotes = (sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort((a, b) => {
            if (a.upDateAt > b.upDateAt) {
                return -1
            } else if (a.upDateAt < b.upDateAt) {
                return 1
            } else {
                0
            }
        })
    } else if (sortBy === 'byCreated') {
        return notes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'alphabeticaly') {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return notes
    }
}

const upDateNote = (id, updates) => {
    const note = notes.find((note)=> note.id === id)

    if (!note) {
        return `Note not found.`
    }

    if (typeof updates.title === 'string') {
        note.title = updates.title
        note.upDateAt = moment().valueOf()
    }

    if (typeof updates.body === 'string') {
        note.body = updates.body
        note.upDateAt = moment().valueOf()
    }

    saveNotes()
}

notes = loadNotes()

export { getNotes, createNote, removeNote, sortNotes, upDateNote }