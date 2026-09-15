import { Payment } from '../infra/typeorm/entities/Payment'

export class PaymentMapper {
  static toDTO(payment: Payment) {
    return {
      id: payment.id,
      contract_id: payment.contract_id,
      amount: payment.amount,
      method: payment.method,
      status: payment.status,
      paid_at: payment.paid_at,
      created_at: payment.created_at,
    }
  }
}
