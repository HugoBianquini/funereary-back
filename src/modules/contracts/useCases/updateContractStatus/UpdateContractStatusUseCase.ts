import { inject, injectable } from 'tsyringe'
import { IContractRepository } from '@modules/contracts/repositories/IContractRepository'
import { AppError } from '@shared/errors/AppError'
import { Contract, ContractStatus } from '@modules/contracts/infra/typeorm/entities/Contract'

interface IRequest {
  id: string
  status: ContractStatus
}

@injectable()
export class UpdateContractStatusUseCase {
  constructor(
    @inject('ContractRepository')
    private contractRepository: IContractRepository
  ) {}

  async execute({ id, status }: IRequest): Promise<Contract> {
    const contract = await this.contractRepository.findById(id)
    if (!contract) throw new AppError('Contrato não encontrado', 404)
    contract.status = status
    return this.contractRepository.save(contract)
  }
}
