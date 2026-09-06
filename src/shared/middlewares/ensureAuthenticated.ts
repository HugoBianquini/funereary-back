import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { AppError } from '../errors/AppError'

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization
  if (!authHeader) throw new AppError('Token ausente', 401)

  const [, token] = authHeader.split(' ')
  try {
    const decoded = verify(token, process.env.JWT_SECRET as string) as { sub: string }
    req.user = { id: decoded.sub }
    next()
  } catch {
    throw new AppError('Token inválido', 401)
  }
}
