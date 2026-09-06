import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateUserUseCase } from './CreateUserUseCase'
import { UserMapper } from '@modules/users/mappers/UserMapper'

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password, cpf, phone_number } = req.body
    const useCase = container.resolve(CreateUserUseCase)
    const user = await useCase.execute({ name, email, password, cpf, phone_number })
    return res.status(201).json(UserMapper.toDTO(user))
  }
}
