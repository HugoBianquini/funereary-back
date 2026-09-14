import { Repository } from 'typeorm'
import { AppDataSource } from '@shared/infra/typeorm/data-source'
import { IFuneraryRepository } from '@modules/funeraries/repositories/IFuneraryRepository'
import { ICreateFuneraryDTO } from '@modules/funeraries/dtos/ICreateFuneraryDTO'
import { Funerary } from '../entities/Funerary'

export class FuneraryRepository implements IFuneraryRepository {
  private repository: Repository<Funerary>

  constructor() {
    this.repository = AppDataSource.getRepository(Funerary)
  }

  async create(data: ICreateFuneraryDTO): Promise<Funerary> {
    const funerary = this.repository.create(data)
    return this.repository.save(funerary)
  }

  async findById(id: string): Promise<Funerary | null> {
    return this.repository.findOneBy({ id })
  }

  async findAll({ city, active }: { city?: string; active?: boolean }): Promise<Funerary[]> {
    const qb = this.repository.createQueryBuilder('funerary')
    if (city) qb.andWhere('funerary.city ILIKE :city', { city: `%${city}%` })
    if (active !== undefined) qb.andWhere('funerary.active = :active', { active })
    return qb.getMany()
  }

  async save(funerary: Funerary): Promise<Funerary> {
    return this.repository.save(funerary)
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}
