import { inject, injectable } from 'tsyringe'
import { IContractRepository } from '@modules/contracts/repositories/IContractRepository'
import { AppError } from '@shared/errors/AppError'
import { Contract } from '@modules/contracts/infra/typeorm/entities/Contract'

@injectable()
export class ShowContractUseCase {
  constructor(
    @inject('ContractRepository')
    private contractRepository: IContractRepository
  ) {}

  async execute(id: string, userId: string): Promise<Contract> {
    const contract = await this.contractRepository.findById(id)
    if (!contract) throw new AppError('Contrato não encontrado', 404)
    if (contract.user_id !== userId) throw new AppError('Acesso negado', 403)
    return contract
  }
}
