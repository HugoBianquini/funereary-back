import { ICreateFuneraryDTO } from '../dtos/ICreateFuneraryDTO'
import { Funerary } from '../infra/typeorm/entities/Funerary'

export interface IFuneraryRepository {
  create(data: ICreateFuneraryDTO): Promise<Funerary>
  findById(id: string): Promise<Funerary | null>
  findAll(filters: { city?: string; active?: boolean }): Promise<Funerary[]>
  save(funerary: Funerary): Promise<Funerary>
  delete(id: string): Promise<void>
}
