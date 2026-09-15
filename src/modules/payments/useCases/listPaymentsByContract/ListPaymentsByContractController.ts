import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListPaymentsByContractUseCase } from './ListPaymentsByContractUseCase'
import { PaymentMapper } from '@modules/payments/mappers/PaymentMapper'

export class ListPaymentsByContractController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { contractId } = req.params
    const useCase = container.resolve(ListPaymentsByContractUseCase)
    const payments = await useCase.execute(contractId)
    return res.json(payments.map(PaymentMapper.toDTO))
  }
}
