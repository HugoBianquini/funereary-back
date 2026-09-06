import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ProfileUserUseCase } from './ProfileUserUseCase'
import { UserMapper } from '@modules/users/mappers/UserMapper'

export class ProfileUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user
    const useCase = container.resolve(ProfileUserUseCase)
    const user = await useCase.execute(id)
    return res.json(UserMapper.toDTO(user))
  }
}
