import request from 'supertest'
import app from '../app'
import { IProduct } from '../database/products'

describe('products', () => {
  describe('GET /', () => {
    it('should return an array of length 3', async () => {
      const response = await request(app).get('/api/products')

      expect(response.body.length).toBe(3)
    })

    it('should return an array of products', async () => {
      const response = await request(app).get('/api/products')

      const expected: IProduct = { id: '1', name: 'A book', price: 120 }

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
      const testProduct = { id: '4', name: 'A vase', price: 12 }

      const response = await request(app).post('/api/products').expect('Content-Type', /json/).send({
        product: testProduct,
      })

      expect(response.statusCode).toBe(201)
      expect(response.body).toEqual({ product: testProduct })

      //make sure we now have 4 products
      const productsResponse = await request(app).get('/api/products')
      expect(productsResponse.body.length).toBe(4)
    })

    it('returns a 400 and a message for invalid product', async () => {
      const invalidTestProduct = { id: '4', price: 12 }

      const response = await request(app).post('/api/products').expect('Content-Type', /json/).send({
        product: invalidTestProduct,
      })

      expect(response.statusCode).toBe(400)
      expect(response.body.message).toBe('Invalid product')

      //make sure still have 4 products (one was added in the previous post test)
      const productsResponse = await request(app).get('/api/products')
      expect(productsResponse.body.length).toBe(4)
    })
  })

  describe('PUT /:id', () => {
    it('updates the price of a product and products length remains the same', async () => {
      const update = { id: '1', name: 'A new edition of the book', price: 170 }

      const response = await request(app).put('/api/products/1').send(update)

      expect(response.statusCode).toBe(200)
      expect(response.body.message).toBe('Product updated successfully')

      // make sure still have 4 products
      const productsResponse = await request(app).get('/api/products')
      expect(productsResponse.body.length).toBe(4)
      expect(productsResponse.body.find((prod: IProduct) => prod.name === 'A new edition of the book')).toEqual(update)
    })

    it('returns a 400 bad request if update object is invalid', async () => {
      const update = { id: '1', price: 220 }

      const response = await request(app).put('/api/products/1').send(update)

      expect(response.statusCode).toBe(400)
      expect(response.body.message).toBe('Invalid product')

      const productsResponse = await request(app).get('/api/products')
      expect(productsResponse.body.find((prod: IProduct) => prod.price === 220)).toBeFalsy()
    })
  })

  describe('DELETE /:id', () => {
    it('deletes a product and products length decreases by 1', async () => {
      const response = await request(app).delete('/api/products/1')

      expect(response.statusCode).toBe(200)
      expect(response.body.message).toBe('Product with id 1 deleted successfully')

      //make sure we have 3 products
      const productsResponse = await request(app).get('/api/products')
      expect(productsResponse.body.length).toBe(3)
    })
    it('should return a 404 if id is invalid', async () => {
      const response = await request(app).delete('/api/products/1')

      expect(response.statusCode).toBe(404)
      expect(response.body.message).toBe('Product with id 1 not found')

      //make sure still we have 3 products
      const productsResponse = await request(app).get('/api/products')
      expect(productsResponse.body.length).toBe(3)
    })
  })
})
