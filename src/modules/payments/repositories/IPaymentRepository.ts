import { ICreatePaymentDTO } from '../dtos/ICreatePaymentDTO'
import { Payment } from '../infra/typeorm/entities/Payment'

export interface IPaymentRepository {
  create(data: ICreatePaymentDTO): Promise<Payment>
  findByContractId(contractId: string): Promise<Payment[]>
}
