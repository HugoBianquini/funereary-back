import 'reflect-metadata'
import 'dotenv/config'
import '../../container'
import express, { Request, Response, NextFunction } from 'express'
import path from 'path'
import { router } from './routes'
import { AppError } from '../../errors/AppError'

const app = express()

app.use(express.json())
app.use('/uploads', express.static(path.resolve('uploads')))
app.use('/images', express.static(path.resolve('public', 'images')))

app.use(router)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message })
  }
  console.error(err)
  return res.status(500).json({ message: 'Internal server error' })
})

export { app }
