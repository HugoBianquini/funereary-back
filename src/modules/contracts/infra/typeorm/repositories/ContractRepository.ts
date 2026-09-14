import { Repository } from 'typeorm'
import { AppDataSource } from '@shared/infra/typeorm/data-source'
import { IContractRepository } from '@modules/contracts/repositories/IContractRepository'
import { ICreateContractDTO } from '@modules/contracts/dtos/ICreateContractDTO'
import { Contract } from '../entities/Contract'

export class ContractRepository implements IContractRepository {
  private repository: Repository<Contract>

  constructor() {
    this.repository = AppDataSource.getRepository(Contract)
  }

  async create(data: ICreateContractDTO): Promise<Contract> {
    const contract = this.repository.create(data)
    return this.repository.save(contract)
  }

  async findById(id: string): Promise<Contract | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['cemetery', 'funerary', 'user'],
    })
  }

  async findByUserId(userId: string): Promise<Contract[]> {
    return this.repository.find({
      where: { user_id: userId },
      relations: ['cemetery', 'funerary'],
      order: { created_at: 'DESC' },
    })
  }

  async save(contract: Contract): Promise<Contract> {
    return this.repository.save(contract)
  }
}
