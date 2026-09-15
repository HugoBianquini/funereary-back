import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreatePaymentUseCase } from './CreatePaymentUseCase'
import { PaymentMapper } from '@modules/payments/mappers/PaymentMapper'

export class CreatePaymentController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { contract_id, amount, method } = req.body
    const useCase = container.resolve(CreatePaymentUseCase)
    const payment = await useCase.execute({ contract_id, amount, method })
    return res.status(201).json(PaymentMapper.toDTO(payment))
  }
}
