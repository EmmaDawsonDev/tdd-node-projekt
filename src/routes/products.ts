import { Router, Request, Response } from 'express'
import { IProduct } from '../database/products'
import * as db from '../database'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  const products = db.getAllProducts()

  res.status(200).json(products)
})

router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params

  const product = db.getProductById(id)

  if (product) {
    res.status(200).json(product)
  } else {
    res.status(404).json({ message: `Product with id ${id} not found` })
  }
})

router.post('/', (req: Request, res: Response) => {
  const product: IProduct = req.body.product
  
  if (product.id && product.name && product.price) {
    db.createProduct(product)

    res.status(201).json({ product })
  } else {
    res.status(400).json({ message: 'Invalid product'})
  }
})

router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params
  const update: IProduct = req.body

  if (update.id && update.name && update.price) {
    const success = db.updateProduct(id, update)

    if (success) {
      res.status(200).json({ message: 'Product updated successfully' })
    } else {
      res.status(404).json({ message: `Product with id ${id} not found` })
    }
  } else {
    res.status(400).json({ message: 'Invalid product' })
  }
})

router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params

  const success = db.deleteProduct(id)
  
  if (success) {
    res.status(200).json({ message: `Product with id ${id} deleted successfully` })
  } else {
    res.status(404).json({ message: `Product with id ${id} not found` })
  }
})

export default router
