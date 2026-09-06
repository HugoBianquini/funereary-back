export interface ICreateUserDTO {
  name: string
  email: string
  password_hash: string
  cpf?: string
  phone_number?: string
}
