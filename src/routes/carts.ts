import { Router, Request, Response } from 'express'
import { ICart } from '../database/carts'
import { IUser } from '../database/users'

import * as db from '../database'

const router = Router()

router.get('/:userLogin', (req: Request, res: Response) => {
  const { userLogin } = req.params

  const cart = db.getCartById(userLogin)

  if (cart) {
    res.status(200).json(cart.items)
  } else {
    res.status(404).json({ message: `User cart with login ${userLogin} not found` })
  }
})

router.post('/:userLogin', (req: Request, res: Response) => {
  const newCart: ICart = req.body.cart // Refactorera till detta?
  const { userLogin } = req.params

  const user: IUser | undefined = db.getUserById(userLogin)

  if (user) {
    const cart: ICart | undefined = db.getCartById(userLogin)
    if (!cart) {
      db.createCart(newCart)
      res.status(201).json({ message: `Cart added successfully for userLogin ${userLogin}` })
    } else {
      res.status(409).json({ message: 'Conflict: cart already exists' })
    }
  } else {
    res.status(404).json({ message: `User with login ${userLogin} not found` })
  }
})

router.put('/:userLogin/:itemId', (req: Request, res: Response) => {
  const { userLogin, itemId } = req.params
  const updatedAmount: number = req.body.updatedAmount

  const userCart: ICart | undefined = db.getCartById(userLogin)

  const success = db.updateCart(userCart, updatedAmount, itemId)
  if (success) {
    res.status(200).json({ message: 'Cart updated successfully' })
  } else {
    res.status(400).json({ message: 'Cart or product does not exist' })
  }
})

router.delete('/:userLogin/:itemId', (req: Request, res: Response) => {
  const { userLogin, itemId } = req.params

  const userCart = db.getCartById(userLogin)

  const response = db.deleteCartItem(userCart, itemId)!
  res.status(response.status).json({ message: response.message })
})

export default router


