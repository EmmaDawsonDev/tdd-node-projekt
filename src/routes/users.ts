import { Router, Request, Response } from 'express'
import * as db from '../database'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  const users = db.getAllUsers()
  res.status(200).json(users)
})

router.get('/:id',(req: Request, res: Response) => {
  const { id } = req.params
  
  const user = db.getUserById(id)

  if (user) {
    res.status(200).json(user)
  } else {
    res.status(404).json({ message: `User with id ${id} not found`})
  }
})

router.post('/', (req: Request, res: Response) => {
  const { user } = req.body

  if (user.name && user.login) {
    db.createUser(user)
    res.status(201).json({ user })
  } else {
    res.status(400).json({ message: 'Invalid user' })
  }
})

router.delete('/:id', (req: Request, res: Response) => {
const { id } = req.params

const success = db.deleteUser(id)

if (success) {
   res.status(200).json({ message: `User with login ${id} deleted successfully`})
 } else {
   res.status(404).json({ message: `User with login ${id} not found`})
 }
})

export default router
