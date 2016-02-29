'use strict'

;(() => {
  window.RemoveMergeButton = (() => {
    const defaults = {
      repos: {}
    }
    const api = {
      storage: {
        get: (cb) => {
          window.chrome.storage.sync.get(defaults, (items) => {
            cb(null, items)
          })
        }
      , set: (obj, cb) => {
          window.chrome.storage.sync.set(obj, cb)
        }
      }
    }

    api.defaults = defaults

    return api
  })()
})()
