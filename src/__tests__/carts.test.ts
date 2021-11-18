import request from "supertest";
import app from "../app";
import { ICart, ICartItem } from "../database/carts";

describe("carts", () => {
  describe('GET /:userLogin', () => {
    it('should return the cart items with correct user login', async () => {
      const response = await request(app).get('/api/carts/grillkorv')

      const expected: ICartItem[] = [{ productId: '3', amount: 2 }]

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(expected)
    })

    it('should return a 404 if user cart not found', async () => {
      const response = await request(app).get('/api/carts/peachpuff')

      expect(response.statusCode).toBe(404)
      expect(response.body.message).toBe(`User cart with login peachpuff not found`)
    })
  })
  describe('POST /:userLogin', () => {
    it('should add a new cart with userLogin paco', async () => {
      const newCart: ICart = {
        userLogin: 'paco',
        items: [
          { productId: '2', amount: 1 },
          { productId: '1', amount: 3 },
        ],
      }

      const response = await request(app).post(`/api/carts/paco`).send({ cart: newCart })

      expect(response.statusCode).toBe(201)

      expect(response.body.message).toBe('Cart added successfully for userLogin paco')

      const cartsResponse = await request(app).get('/api/carts/paco')

      expect(cartsResponse.body as ICartItem[]).toEqual(newCart.items)
    })

    it('should return a 409 is cart already exists', async () => {
      const newCart: ICart = {
        userLogin: 'paco',
        items: [{ productId: '3', amount: 1 }],
      }

      const response = await request(app).post('/api/carts/paco').send({ cart: newCart })

      expect(response.statusCode).toBe(409)
      expect(response.body.message).toBe('Conflict: cart already exists')

      const existingCart: ICart = {
        userLogin: 'paco',
        items: [
          { productId: '2', amount: 1 },
          { productId: '1', amount: 3 },
        ],
      }

      const cartsResponse = await request(app).get('/api/carts/paco')
      expect(cartsResponse.body as ICartItem[]).toEqual(existingCart.items)
    })

    it('should return 404 if user is not found', async () => {
      const newCart: ICart = {
        userLogin: 'the_king',
        items: [{ productId: '3', amount: 1 }],
      }

      const response = await request(app).post('/api/carts/the_king').send({ cart: newCart })

      expect(response.statusCode).toBe(404)
      expect(response.body.message).toBe('User with login the_king not found')
    })
  })
  describe('PUT /:userLogin/:itemId', () => {
    it('updates the cart of a user', async () => {
      const updatedAmount = 10

      const response = await request(app).put('/api/carts/grillkorv/3').send({ updatedAmount })

      expect(response.statusCode).toBe(200)
      expect(response.body.message).toBe('Cart updated successfully')

      // make sure still have 1 product
      const cartsResponse = await request(app).get('/api/carts/grillkorv')
      expect(cartsResponse.body.length).toBe(1)
      expect(cartsResponse.body.find((item: ICartItem) => item.productId === '3').amount).toEqual(12)
    })

    it('returns a 400 bad request if product does not exist ', async () => {
      const updatedAmount = 1

      const response = await request(app).put('/api/carts/grillkorv/10').send({ updatedAmount })

      expect(response.statusCode).toBe(400)
      expect(response.body.message).toBe('Invalid product')
    })
    it('adds a new product to cart.items if it exists in products ', async () => {
      const updatedAmount = 2

      const response = await request(app).put('/api/carts/grillkorv/2').send({ updatedAmount })

      expect(response.statusCode).toBe(201)
      expect(response.body.message).toBe('Cart updated successfully')

      const expectedCartItems: ICartItem[] = [
        { productId: '3', amount: 12 },
        { productId: '2', amount: 2 },
      ]

      const cartsResponse = await request(app).get('/api/carts/grillkorv')
      expect(cartsResponse.body.length).toBe(2)
      expect(cartsResponse.body).toEqual(expectedCartItems)
    })
  })
});
