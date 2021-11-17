import { Router, Request, Response } from 'express'
import { productsDb, IProduct } from '../database/products'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.status(200).json(productsDb)
})

router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params

  const product = productsDb.find(product => product.id === id)

  if (product) {
    res.status(200).json(product)
  } else {
    res.status(404).json({ message: `Product with id ${id} not found` })
  }
})

router.post('/', (req: Request, res: Response) => {
  const product: IProduct = req.body.product
  
  if (product.id && product.name && product.price) {
    productsDb.push(product)
    res.status(201).json({ product })
  } else {
    res.status(400).json({ message: 'Invalid product'})
  }
})

router.put('/:id')

router.delete('/:id')

export default router
