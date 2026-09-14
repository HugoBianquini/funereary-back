import { ICreateContractDTO } from '../dtos/ICreateContractDTO'
import { ContractStatus } from '../dtos/IUpdateContractStatusDTO'
import { Contract } from '../infra/typeorm/entities/Contract'

export interface IContractRepository {
  create(data: ICreateContractDTO): Promise<Contract>
  findById(id: string): Promise<Contract | null>
  findByUserId(userId: string): Promise<Contract[]>
  save(contract: Contract): Promise<Contract>
}
