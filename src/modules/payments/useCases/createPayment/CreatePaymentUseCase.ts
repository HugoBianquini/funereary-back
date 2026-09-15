import { inject, injectable } from 'tsyringe'
import { IPaymentRepository } from '@modules/payments/repositories/IPaymentRepository'
import { IContractRepository } from '@modules/contracts/repositories/IContractRepository'
import { AppError } from '@shared/errors/AppError'
import { Payment } from '@modules/payments/infra/typeorm/entities/Payment'
import { PaymentMethod } from '@modules/payments/dtos/ICreatePaymentDTO'

interface IRequest {
  contract_id: string
  amount: number
  method: PaymentMethod
}

@injectable()
export class CreatePaymentUseCase {
  constructor(
    @inject('PaymentRepository')
    private paymentRepository: IPaymentRepository,
    @inject('ContractRepository')
    private contractRepository: IContractRepository
  ) {}

  async execute({ contract_id, amount, method }: IRequest): Promise<Payment> {
    const contract = await this.contractRepository.findById(contract_id)
    if (!contract) throw new AppError('Contrato não encontrado', 404)
    return this.paymentRepository.create({ contract_id, amount, method })
  }
}
