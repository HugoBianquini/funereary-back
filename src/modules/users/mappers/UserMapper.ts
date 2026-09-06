import { User } from '../infra/typeorm/entities/User'

export class UserMapper {
  static toDTO(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      phone_number: user.phone_number,
      created_at: user.created_at,
    }
  }
}
