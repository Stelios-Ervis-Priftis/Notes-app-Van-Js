// Import helpers.js
import { log, doc } from './helpers'

// Import functions from notes.js
import { getNotes, createNote, removeNote, upDateNote } from './notes'
import { getFilters, setFilters } from './filters'

log(getFilters())
setFilters({
    searchText: 'New',
    sortBy: 'byCreated'
})
log(getFilters())

// createNote()
// upDateNote('bf74a82a-54d5-4343-9caa-e8b4cb2b79a9', { title:'New note', body:'New body' })
// log(getNotes())