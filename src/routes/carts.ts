import { Router, Request, Response } from 'express'
import { cartsDb, ICart, ICartItem } from '../database/carts'
import { usersDb, IUser } from '../database/users'
import { productsDb } from '../database/products'

const router = Router()

router.get('/:userLogin', (req: Request, res: Response) => {
  const { userLogin } = req.params

  const cart = cartsDb.find(cart => cart.userLogin === userLogin)
  if (cart) {
    res.status(200).json(cart.items)
  } else {
    res.status(404).json({ message: `User cart with login ${userLogin} not found` })
  }
})

router.post('/:userLogin', (req: Request, res: Response) => {
  const newCart: ICart = req.body.cart // Refactorera till detta?
  const { userLogin } = req.params

  const user: IUser | undefined = usersDb.find(user => user.login === userLogin)

  if (user) {
    const cart: ICart | undefined = cartsDb.find(cart => cart.userLogin === userLogin)
    if (!cart) {
      cartsDb.push(newCart)
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

  const userCart = cartsDb.find(cart => cart.userLogin === userLogin)

  if (userCart) {
    const itemToUpdate = userCart.items.find(item => item.productId === itemId)
    if (itemToUpdate) {
      itemToUpdate.amount += updatedAmount
      res.status(200).json({ message: 'Cart updated successfully' })
    } else {
      const productToBeAdded = productsDb.find(product => product.id === itemId)
      if (!productToBeAdded) {
        res.status(400).json({ message: 'Invalid product' })
      } else {
        userCart.items.push({ productId: itemId, amount: updatedAmount })
        res.status(201).json({ message: 'Cart updated successfully' })
      }
    }
  }
})



router.delete('/:userLogin/:itemId')

export default router
