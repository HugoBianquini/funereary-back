import { inject, injectable } from 'tsyringe'
import { IPaymentRepository } from '@modules/payments/repositories/IPaymentRepository'
import { Payment } from '@modules/payments/infra/typeorm/entities/Payment'

@injectable()
export class ListPaymentsByContractUseCase {
  constructor(
    @inject('PaymentRepository')
    private paymentRepository: IPaymentRepository
  ) {}

  async execute(contractId: string): Promise<Payment[]> {
    return this.paymentRepository.findByContractId(contractId)
  }
}
