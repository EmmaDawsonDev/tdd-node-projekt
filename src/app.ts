import express from 'express'
import productRoutes from './routes/products'
import userRoutes from './routes/users'
import cartRoutes from './routes/cart'

const app = express()

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/carts/:userLogin', cartRoutes)

export default app
