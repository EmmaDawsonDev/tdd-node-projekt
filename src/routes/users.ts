import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.send('Hi from users!')
})

router.get('/:id')

router.post('/')

router.delete('/:id')

export default router
