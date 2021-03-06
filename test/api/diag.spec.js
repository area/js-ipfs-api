'use strict'

describe('.diag', () => {
  it('.diag.net', (done) => {
    apiClients['a'].diag.net((err, res) => {
      expect(err).to.not.exist
      expect(res).to.exist
      done()
    })
  })

  it('.diag.sys', (done) => {
    apiClients['a'].diag.sys((err, res) => {
      expect(err).to.not.exist
      expect(res).to.exist
      expect(res).to.have.a.property('memory')
      expect(res).to.have.a.property('diskinfo')
      done()
    })
  })

  describe('promise', () => {
    it('.diag.net', () => {
      return apiClients['a'].diag.net()
        .then((res) => {
          expect(res).to.exist
        })
    })

    it('.diag.sys', () => {
      return apiClients['a'].diag.sys()
        .then((res) => {
          expect(res).to.exist
          expect(res).to.have.a.property('memory')
          expect(res).to.have.a.property('diskinfo')
        })
    })
  })
})
