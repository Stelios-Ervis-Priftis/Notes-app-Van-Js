import { initializeEditPage, generateLastEdited } from './views'
import { upDateNote, removeNote } from './notes'

const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const removeElement = document.querySelector('#remove-note')
const dateElement = document.querySelector('#last-edited')
const noteId = location.hash.substring(1);

initializeEditPage(noteId)

titleElement.addEventListener('input', (e) => {
    const note = upDateNote(noteId, {
        title: e.target.value
    })

    dateElement.textContent = generateLastEdited(note.upDateAt)
})

bodyElement.addEventListener('input', (e) => {
    const note = upDateNote(noteId, {
        body: e.target.value
    })

    dateElement.textContent = generateLastEdited(note.upDateAt)
})

removeElement.addEventListener('click', (e) => {
    removeNote(noteId)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        initializeEditPage(noteId)
    }
})