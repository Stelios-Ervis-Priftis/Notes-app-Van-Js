// Import helpers.js
import { log, doc } from './helpers'

// Import functions from notes.js
import { createNote } from './notes'
import { setFilters } from './filters'
import { renderNotes } from './views'


renderNotes()


document.querySelector('#create-note').addEventListener('click', (e) => {
    const id = createNote()
    location.assign(`/edit.html#${id}`)
})

// document.querySelector('#clear-notes').addEventListener('click', (e) => {
//   localStorage.clear('notes')
//   renderNotes(notes, filters)
// })

document.querySelector('#search-test').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderNotes()
})

document.querySelector('#drop-down').addEventListener('change', (e) => {
    setFilters({
        sortBy: e.target.value
    })
    renderNotes()
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        renderNotes()
    }
})



// log(getFilters())
// setFilters({
//     searchText: 'New',
//     sortBy: 'byCreated'
// })
// log(getFilters())

// createNote()
// upDateNote('bf74a82a-54d5-4343-9caa-e8b4cb2b79a9', { title:'New note', body:'New body' })
// log(getNotes())