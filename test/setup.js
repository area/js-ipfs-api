/* eslint-env mocha */
'use strict'

const ipfsAPI = require('../src/index.js')
const apiAddrs = require('./tmp-disposable-nodes-addrs.json')

// a, b, c
global.apiClients = {}

function connectNodes (done) {
  const addrs = {}
  let counter = 0

  function collectAddr (key, cb) {
    global.apiClients[key].id((err, id) => {
      if (err) {
        throw err
      }
      // note to self: HTTP API port !== Node port
      addrs[key] = id.Addresses[0]
      cb()
    })
  }

  function dial () {
    global.apiClients.a.swarm.connect(addrs.b, (err1, res) => {
      if (err1) {
        throw err1
      }
      global.apiClients.a.swarm.connect(addrs.c, (err2) => {
        if (err2) {
          throw err2
        }
        done()
      })
    })
  }

  function finish () {
    counter++
    if (counter === 2) {
      dial()
    }
  }

  collectAddr('b', finish)
  collectAddr('c', finish)
}

before(function (done) {
  this.timeout(20000)

  Object.keys(apiAddrs).forEach((key) => {
    global.apiClients[key] = ipfsAPI(apiAddrs[key])
  })

  connectNodes(done)
})
