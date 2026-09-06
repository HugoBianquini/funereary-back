import { inject, injectable } from 'tsyringe'
import { hash } from 'bcryptjs'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { AppError } from '@shared/errors/AppError'
import { User } from '@modules/users/infra/typeorm/entities/User'

interface IRequest {
  name: string
  email: string
  password: string
  cpf?: string
  phone_number?: string
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute({ name, email, password, cpf, phone_number }: IRequest): Promise<User> {
    const emailExists = await this.userRepository.findByEmail(email)
    if (emailExists) throw new AppError('Email já cadastrado')

    const password_hash = await hash(password, 8)
    return this.userRepository.create({ name, email, password_hash, cpf, phone_number })
  }
}
