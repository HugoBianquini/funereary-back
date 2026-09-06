import { inject, injectable } from 'tsyringe'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { AppError } from '@shared/errors/AppError'
import { UserMapper } from '@modules/users/mappers/UserMapper'

interface IRequest {
  email: string
  password: string
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute({ email, password }: IRequest) {
    const user = await this.userRepository.findByEmail(email)
    if (!user) throw new AppError('Email ou senha inválidos', 401)

    const passwordMatch = await compare(password, user.password_hash)
    if (!passwordMatch) throw new AppError('Email ou senha inválidos', 401)

    const token = sign({}, process.env.JWT_SECRET as string, {
      subject: user.id,
      expiresIn: (process.env.JWT_EXPIRES_IN as string) || '1d',
    })

    return { user: UserMapper.toDTO(user), token }
  }
}
