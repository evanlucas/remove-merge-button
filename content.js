'use strict'

const injector = window.gitHubInjection

document.addEventListener('DOMContentLoaded', () => {
  window.RemoveMergeButton.storage.get((err, items) => {
    if (err) throw err
    const repos = items.repos
    const url = window.location.pathname
    const splits = url.split('/')
    splits.shift()
    const org = splits[0]
    const repoName = splits[1]
    if (!org || !repoName) {
      return
    }

    const repo = `${org}/${repoName}`

    if (!repos[repo]) {
      return
    }

    injector(window, (err) => {
      if (err) {
        return
      }

      const ele = document.querySelector('.js-merge-branch-action')
      if (ele) {
        ele.classList.add('disabled')
        ele.setAttribute('disabled', 'disabled')
        ele.style.display = 'none'
      }
    })
  })
})
