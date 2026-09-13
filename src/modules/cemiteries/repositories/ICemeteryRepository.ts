import { ICreateCemeteryDTO } from '../dtos/ICreateCemeteryDTO'
import { IUpdateCemeteryDTO } from '../dtos/IUpdateCemeteryDTO'
import { Cemetery } from '../infra/typeorm/entities/Cemetery'

export interface ICemeteryRepository {
  create(data: ICreateCemeteryDTO): Promise<Cemetery>
  findById(id: string): Promise<Cemetery | null>
  findAll(filters: { city?: string; active?: boolean }): Promise<Cemetery[]>
  save(cemetery: Cemetery): Promise<Cemetery>
  delete(id: string): Promise<void>
}
