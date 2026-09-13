import { Repository } from 'typeorm'
import { AppDataSource } from '@shared/infra/typeorm/data-source'
import { ICemeteryRepository } from '@modules/cemiteries/repositories/ICemeteryRepository'
import { ICreateCemeteryDTO } from '@modules/cemiteries/dtos/ICreateCemeteryDTO'
import { Cemetery } from '../entities/Cemetery'

export class CemeteryRepository implements ICemeteryRepository {
  private repository: Repository<Cemetery>

  constructor() {
    this.repository = AppDataSource.getRepository(Cemetery)
  }

  async create(data: ICreateCemeteryDTO): Promise<Cemetery> {
    const cemetery = this.repository.create(data)
    return this.repository.save(cemetery)
  }

  async findById(id: string): Promise<Cemetery | null> {
    return this.repository.findOneBy({ id })
  }

  async findAll({ city, active }: { city?: string; active?: boolean }): Promise<Cemetery[]> {
    const qb = this.repository.createQueryBuilder('cemetery')
    if (city) qb.andWhere('cemetery.city ILIKE :city', { city: `%${city}%` })
    if (active !== undefined) qb.andWhere('cemetery.active = :active', { active })
    return qb.getMany()
  }

  async save(cemetery: Cemetery): Promise<Cemetery> {
    return this.repository.save(cemetery)
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}
