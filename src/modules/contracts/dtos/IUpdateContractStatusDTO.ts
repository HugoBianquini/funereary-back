export type ContractStatus = 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'

export interface IUpdateContractStatusDTO {
  id: string
  status: ContractStatus
}
