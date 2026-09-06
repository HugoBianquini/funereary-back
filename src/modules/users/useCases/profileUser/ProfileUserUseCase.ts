import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { AppError } from '@shared/errors/AppError'
import { User } from '@modules/users/infra/typeorm/entities/User'

@injectable()
export class ProfileUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id)
    if (!user) throw new AppError('Usuário não encontrado', 404)
    return user
  }
}
