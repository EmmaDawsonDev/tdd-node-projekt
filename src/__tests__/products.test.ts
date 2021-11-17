// import request from 'supertest'
// import app from '../app'
const request = require('supertest')
const app = require('../app')

describe('products', () => {
  describe('GET /', () => {
    it('should return an array with 3 products', async () => {
      const response = await request(app).get('/')
      console.log(response)
    })
  })
})
