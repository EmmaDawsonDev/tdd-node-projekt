import { Router, Request, Response } from 'express'
import { usersDb } from '../database/users'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.status(200).json(usersDb)
})

router.get('/:id',(req: Request, res: Response) => {
  const { id } = req.params
  
  const user = usersDb.find(user => user.login === id)

  if (user) {
    res.status(200).json(user)
  } else {
    res.status(404).json({ message: `User with id ${id} not found`})
  }
})

router.post('/', (req: Request, res: Response) => {
  const { user } = req.body

  if (user.name && user.login) {
    usersDb.push(user)
    res.status(201).json({ user })
  } else {
    res.status(400).json({ message: 'Invalid user' })
  }
})

router.delete('/:id', (req: Request, res: Response) => {
 const { id } = req.params
 const index = usersDb.findIndex(user => user.login === id)

 if (index >= 0) {
   usersDb.splice(index, 1)

   res.status(200).json({ message: `User with login ${id} deleted successfully`})
 } else {
   res.status(404).json({ message: `User with login ${id} not found`})
 }

})

export default router
