import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.send('Hi from cart!')
})

router.post('/')

router.put('/:itemId')

router.delete('/:itemId')

export default router
