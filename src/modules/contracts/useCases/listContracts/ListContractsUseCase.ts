import { inject, injectable } from 'tsyringe'
import { IContractRepository } from '@modules/contracts/repositories/IContractRepository'
import { Contract } from '@modules/contracts/infra/typeorm/entities/Contract'

@injectable()
export class ListContractsUseCase {
  constructor(
    @inject('ContractRepository')
    private contractRepository: IContractRepository
  ) {}

  async execute(userId: string): Promise<Contract[]> {
    return this.contractRepository.findByUserId(userId)
  }
}
