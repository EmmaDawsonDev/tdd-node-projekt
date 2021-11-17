import request from 'supertest'
import app from '../app'

describe('products', () => {
  describe('GET /', () => {
    it('should return an array of length 3', async () => {
      const response = await request(app).get('/api/products')

      expect(response.body.length).toBe(3)
    })

    it('should return an array of products', async () => {
      const response = await request(app).get('/api/products')

      const expected = { id: '1', name: 'A book', price: 120 }

      expect(response.body[0]).toEqual(expected)
    })

    it('should return statusCode 200', async () => {
      const response = await request(app).get('/api/products')

      expect(response.statusCode).toBe(200)
    })
  })

  describe('GET /:id', () => {
    it('should return a book with id 1', async () => {
      const response = await request(app).get('/api/products/1')

      const expected = { id: '1', name: 'A book', price: 120 }

      expect(response.body).toEqual(expected)
    })

    it('should return a status 404 and a message for wrong id', async () => {
      const response = await request(app).get('/api/products/4')

      expect(response.statusCode).toBe(404)
      expect(response.body.message).toBe('Product with id 4 not found')
    })
  })

  describe('POST /', () => {
    it('adds a product to productsDb', async () => {
      const testProduct = { id: 4, name: 'A vase', price: 12}

      const response = await request(app)
      .post('/api/products')
      .expect('Content-Type', /json/)
      .send({
        product: testProduct,
      })
      
      expect(response.statusCode).toBe(201)
      expect(response.body).toEqual({product: testProduct})
    })

    it('returns a 400 and a message for invalid product', async () => {
      const invalidTestProduct = { id: 4, price: 12}

      const response = await request(app)
      .post('/api/products')
      .expect('Content-Type', /json/)
      .send({
        product: invalidTestProduct,
      })

      expect(response.statusCode).toBe(400)
      expect(response.body.message).toBe('Invalid product')
    })
  })
})
