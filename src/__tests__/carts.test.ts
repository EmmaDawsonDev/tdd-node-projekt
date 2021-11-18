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
    it('should additems to the users cart', async () => {
      const newItems: ICartItem[] = [{productId: '1', amount: 2}, {productId: '2', amount: 1}]
        
      const response = await request(app).post(`/api/carts/grillkorv/`).send({items: newItems})

      const expectedCart : ICartItem[] = [
        {productId: '3', amount: 2},
        {productId: '1', amount: 2},
        {productId: '2', amount: 1}
      ]

      expect(response.statusCode).toBe(201)
      expect(response.body).toEqual(expectedCart)

      const cartsResponse = await request(app).get('/api/carts/grillkorv')

      expect(cartsResponse.body.length).toBe(3)
    })

    it('should return a 400 for invalid item/s', async () => {
      const invalidItems = [ {productId: '1'}, {productId: '2', amount: 1} ]
  
      const response = await request(app).post('/api/carts/grillkorv').send({items: invalidItems})
  
      expect(response.statusCode).toBe(400)
      expect(response.body.message).toBe('Invalid cart item')
  
      const cartsResponse = await request(app).get('/api/carts/grillkorv')
      console.log(cartsResponse.body);
      
      expect(cartsResponse.body.length).toBe(3)
    })
  })
//   describe('PUT /:id', () => {
//     it('updates the cart of a user and cart length remains the same', async () => {
//       const update = {productId: '1', amount: 10}

//       const response = await request(app).put('/api/carts/grillkorv').send(update)

//       expect(response.statusCode).toBe(200)
//       expect(response.body.message).toBe('Cart updated successfully')

//       // make sure still have 1 products
//       const productsResponse = await request(app).get('/api/carts/grillkorv')
//       expect(productsResponse.body.length).toBe(1)
//       expect(productsResponse.body.find((item: ICartItem) => item.productId === '1')).toEqual(update)
//     })

    // it('returns a 400 bad request if update object is invalid', async () => {
    //   const update = { id: '1', price: 220 }

    //   const response = await request(app).put('/api/products/1').send(update)

    //   expect(response.statusCode).toBe(400)
    //   expect(response.body.message).toBe('Invalid product')

    //   const productsResponse = await request(app).get('/api/products')
    //   expect(productsResponse.body.find((prod: IProduct) => prod.price === 220)).toBeFalsy()
    // })
//   })
});
