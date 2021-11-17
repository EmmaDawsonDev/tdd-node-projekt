import express, { RequestHandler } from 'express'

const app = express()

app.use(express.json())

const test: RequestHandler = (req, res, next) => {
  res.send('Hello world')
}

app.get('/', test)

export default app
