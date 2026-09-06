import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

export class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body
    const useCase = container.resolve(AuthenticateUserUseCase)
    const result = await useCase.execute({ email, password })
    return res.json(result)
  }
}
