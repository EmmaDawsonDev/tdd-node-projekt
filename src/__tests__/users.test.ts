import request from 'supertest'
import app from '../app'
import { IUser } from '../database/users'

describe('users', () => {
  describe('GET /', () => {
    it('should return an array of length 3', async () => {
      const response = await request(app).get('/api/users')

      expect(response.statusCode).toBe(200)
      expect(response.body.length).toBe(3)
    })

    it('should return an array of users', async () => {
      const response = await request(app).get('/api/users')

      const expected: IUser = {
        name: 'Renzo',
        login: 'paco',
      }

      expect(response.body[2]).toEqual(expected)
    })
  })

  describe('GET /:id', () => {
   it('should return a user named Pelle', async () => {
    const response = await request(app).get('/api/users/grillkorv')

    const expected: IUser = {
      name: 'Pelle',
      login: 'grillkorv'
    }

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(expected)
   })

   it('should return a 404 if user not found', async () => {
    const response = await request(app).get('/api/users/äppelmust')

    expect(response.statusCode).toBe(404)
    expect(response.body.message).toBe(`User with id äppelmust not found`)
   })
  })

  describe('POST /', () => {
    it('should add a user to the user database', async () => {
      const testUser: IUser = {
        name: 'Elvis',
        login: 'the_k1ng'
      }

      const response = await request(app).post('/api/users').send({user: testUser})

      expect(response.statusCode).toBe(201)
      expect(response.body).toEqual({ user: testUser})

      const usersResponse = await request(app).get('/api/users')

      expect(usersResponse.body.length).toBe(4)
    })

    it('should return a 400 for invalid user', async () => {
      const invalidUser = {
        name: 'Madonna'
      }
  
      const response = await request(app).post('/api/users').send({user: invalidUser})
  
      expect(response.statusCode).toBe(400)
      expect(response.body.message).toBe('Invalid user')
  
      const usersResponse = await request(app).get('/api/users')
      expect(usersResponse.body.length).toBe(4)
    })
  })

  describe('DELETE /:id', () => {
    it('should delete a user from the user database', async () => {
      const response = await request(app).delete('/api/users/grillkorv')

      expect(response.statusCode).toBe(200)
      expect(response.body.message).toBe('User with login grillkorv deleted successfully')

      const usersResponse = await request(app).get('/api/users')
      expect(usersResponse.body.length).toBe(3)
    })

    it('should return a 404 for invalid id', async () => {
      const response = await request(app).delete('/api/users/jordnötssmörsmacka')

      expect(response.statusCode).toBe(404)
      expect(response.body.message).toBe('User with login jordnötssmörsmacka not found')

      const usersResponse = await request(app).get('/api/users')
      expect(usersResponse.body.length).toBe(3)
    })
  })
})