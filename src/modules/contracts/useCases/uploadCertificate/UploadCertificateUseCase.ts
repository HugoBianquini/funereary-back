import { inject, injectable } from 'tsyringe'
import { IContractRepository } from '@modules/contracts/repositories/IContractRepository'
import { AppError } from '@shared/errors/AppError'
import { Contract } from '@modules/contracts/infra/typeorm/entities/Contract'

interface IRequest {
  contractId: string
  userId: string
  filename: string
}

@injectable()
export class UploadCertificateUseCase {
  constructor(
    @inject('ContractRepository')
    private contractRepository: IContractRepository
  ) {}

  async execute({ contractId, userId, filename }: IRequest): Promise<Contract> {
    const contract = await this.contractRepository.findById(contractId)
    if (!contract) throw new AppError('Contrato não encontrado', 404)
    if (contract.user_id !== userId) throw new AppError('Acesso negado', 403)
    contract.death_certificate_url = filename
    return this.contractRepository.save(contract)
  }
}
