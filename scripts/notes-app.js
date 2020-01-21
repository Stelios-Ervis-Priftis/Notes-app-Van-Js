'use strict'

// Using the Functions that we have define on "notes-functions.js"

// Dom - Document Object Model
let notes = getSaveNotes()

const filters = {
  searchText: '',
  sortBy: 'byEdited'
}



renderNotes(notes, filters)


document.querySelector('#create-note').addEventListener('click', (e) => {
  const id = uuidv4()
  const timestamp = moment().valueOf()
  pushNotes(id, timestamp)
  saveNotes(notes)
  location.assign(`/edit.html#${id}`)
})

document.querySelector('#clear-notes').addEventListener('click', (e) => {
  localStorage.clear('notes')
  renderNotes(notes, filters)
})

document.querySelector('#search-test').addEventListener('input', (e) => {
  filters.searchText = e.target.value
  renderNotes(notes, filters)
})

document.querySelector('#drop-down').addEventListener('change', (e) => {
  filters.sortBy = e.target.value
  renderNotes(notes, filters)
})

window.addEventListener('storage', (e) => {
  if (e.key === 'notes') {
    notes = JSON.parse(e.newValue)
    renderNotes(notes, filters)    
  }
})
