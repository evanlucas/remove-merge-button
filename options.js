'use strict'

let table
let input
let mainRepos
let button

function $(s) {
  return document.querySelector(s)
}

document.addEventListener('DOMContentLoaded', () => {
  table = $('#repo_table')

  loadOptions()

  input = $('#repo_name')
  input.addEventListener('keyup', handleInput)

  button = $('#addbtn')
  button.addEventListener('click', () => {
    addRepo(input.value)
  })
})

function cbChangeHandler(e) {
  const cb = e.target
  const td = cb.parentNode
  const tr = td.parentNode
  const firstCell = tr.children[0]
  const textVal = firstCell.innerText
  mainRepos[textVal] = cb.checked
  saveOptions()
}

function log(t) {
  return false
  const thing = $('.log')
  const prev = thing.innerHTML || ''
  thing.innerHTML = prev + '<br>' + t
}

function handleInput(e) {
  const code = e.which

  const text = input.value
  if (code === 13) {
    // add to table
    // save
    addRepo(text)
    input.value = ''
  }
}

function addRepo(name) {
  // TODO(evanlucas) validate org/repo
  if (mainRepos[name]) {
    return false
  }

  if (!name) return false

  mainRepos[name] = true
  addRow(name, true)
  saveOptions()
}

function addRow(name, enabled) {
  const row = table.insertRow(table.rows.length)
  const nameCell = row.insertCell(0)
  nameCell.innerText = name
  const cbCell = row.insertCell(1)
  const cb = createCheckbox(name, enabled)
  cbCell.appendChild(cb)
}

function loadOptions() {
  window.RemoveMergeButton.storage.get((err, items) => {
    if (err) {
      log(err.stack)
      throw err
    }
    mainRepos = items.repos
    if (Array.isArray(mainRepos)) {
      mainRepos = {}
    }
    const repos = Object.keys(mainRepos)
    for (let i = 0; i < repos.length; i++) {
      const name = repos[i]
      const enabled = mainRepos[name] || false
      addRow(name, enabled)
    }
  })
}

function createCheckbox(name, checked) {
  const cb = document.createElement('input')
  cb.type = 'checkbox'
  cb.name = name
  cb.id = name
  cb.checked = checked
  cb.onchange = cbChangeHandler
  return cb
}

function saveOptions() {
  window.RemoveMergeButton.storage.set({
    repos: mainRepos
  }, function() {
    console.log('saved')
  })
}
