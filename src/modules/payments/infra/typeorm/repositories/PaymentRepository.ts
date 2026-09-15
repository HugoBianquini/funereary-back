import { Repository } from 'typeorm'
import { AppDataSource } from '@shared/infra/typeorm/data-source'
import { IPaymentRepository } from '@modules/payments/repositories/IPaymentRepository'
import { ICreatePaymentDTO } from '@modules/payments/dtos/ICreatePaymentDTO'
import { Payment } from '../entities/Payment'

export class PaymentRepository implements IPaymentRepository {
  private repository: Repository<Payment>

  constructor() {
    this.repository = AppDataSource.getRepository(Payment)
  }

  async create(data: ICreatePaymentDTO): Promise<Payment> {
    const payment = this.repository.create(data)
    return this.repository.save(payment)
  }

  async findByContractId(contractId: string): Promise<Payment[]> {
    return this.repository.find({
      where: { contract_id: contractId },
      order: { created_at: 'DESC' },
    })
  }
}
