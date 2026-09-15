export type PaymentMethod = 'CREDIT_CARD' | 'PIX' | 'BOLETO'

export interface ICreatePaymentDTO {
  contract_id: string
  amount: number
  method: PaymentMethod
}
