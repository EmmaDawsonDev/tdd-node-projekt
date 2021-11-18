import { Router, Request, Response } from 'express'
import { cartsDb, ICart, ICartItem } from '../database/carts'

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
  const newItems: ICartItem[] = req.body.items // Refactorera till detta?
  const { userLogin } = req.params
  const userCart = cartsDb.find(cart => cart.userLogin === userLogin)
  let validRequest = true

  newItems.forEach(item => {
    if (!item.amount || !item.productId) {
      console.log('inside forEach');
      
      validRequest = false
    }
  })

  if (newItems && userCart && validRequest) {
    
    const cartItems = userCart.items
    const tempCartItems = [...userCart.items]

    for (let i = 0; i < cartItems.length; i++) {
      
      for (let j = 0; j < newItems.length; j++) {
        if (cartItems[i].productId === newItems[j].productId) {
          cartItems[i].amount += newItems[j].amount
        }else{
          tempCartItems.push(newItems[j])
        }
      }
    }

    userCart.items = [...tempCartItems]

    res.status(201).json( userCart.items )
  } else {
    res.status(400).json({ message: 'Invalid cart item' })
  }
})

router.put('/:userLogin/:itemId')

router.delete('/:userLogin/:itemId')

export default router
