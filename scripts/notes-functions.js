'use strict'

// Defining Functions for the note app

// Read existing notes from localstorage step 1
const getSaveNotes = () => {
    const notesJSON = localStorage.getItem('notes');

    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch (error) {
        return []
    }
}

// Push notes into the array 
const pushNotes = (id, timestamp) => {
    notes.push({
        id: id,
        title: '',
        body: '',
        createdAt: timestamp,
        upDateAt: timestamp
    })
}

// Save the notes on localstorage step 2
const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// Remove a note from the list
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}

// Generate the DOM structure for a note step 3
const generateNoteDOM = (note) => {
    const noteEl = document.createElement('div')
    const textEl = document.createElement('a')
    const button = document.createElement('button')

    // Setup the remove note button
    button.textContent = 'x'
    noteEl.appendChild(button);
    button.addEventListener('click', () => {
        removeNote(note.id)
        saveNotes(note)
        renderNotes(notes, filters)
    })    
    // Setup the note title text
    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Unnamed note'
    }
    textEl.setAttribute('href', `/edit.html#${note.id}`)    
    noteEl.appendChild(textEl)
    return noteEl
}

// Sort your notes by one of three ways
const sortNotes = (notes, sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort((a,b) => {
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
        return notes.sort( (a, b) => {
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

// Render application notes step 4
const renderNotes = (notes, filters) => {
    const noteEl = document.querySelector('#notes')
    notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    noteEl.innerHTML = ''

    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const noteTitle = generateNoteDOM(note)
            noteEl.appendChild(noteTitle)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No notes available'
        emptyMessage.classList.add('empty-message')
        noteEl.appendChild(emptyMessage)
    }
}

// Generate the last edited message
const generateLastEdited = (timestamp) => `Last editid: ${moment(timestamp).fromNow()}`