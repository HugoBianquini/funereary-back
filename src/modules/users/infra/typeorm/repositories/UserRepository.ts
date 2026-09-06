import { Repository } from 'typeorm'
import { AppDataSource } from '@shared/infra/typeorm/data-source'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { User } from '../entities/User'

export class UserRepository implements IUserRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = AppDataSource.getRepository(User)
  }

  async create(data: ICreateUserDTO): Promise<User> {
    const user = this.repository.create(data)
    return this.repository.save(user)
  }

  async findById(id: string): Promise<User | null> {
    return this.repository.findOneBy({ id })
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository
      .createQueryBuilder('user')
      .addSelect('user.password_hash')
      .where('user.email = :email', { email })
      .getOne()
  }

  async findByCpf(cpf: string): Promise<User | null> {
    return this.repository.findOneBy({ cpf })
  }

  async save(user: User): Promise<User> {
    return this.repository.save(user)
  }
}
