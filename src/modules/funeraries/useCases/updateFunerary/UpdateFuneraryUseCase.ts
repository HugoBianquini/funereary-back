import { inject, injectable } from 'tsyringe'
import { IFuneraryRepository } from '@modules/funeraries/repositories/IFuneraryRepository'
import { IUpdateFuneraryDTO } from '@modules/funeraries/dtos/IUpdateFuneraryDTO'
import { AppError } from '@shared/errors/AppError'
import { Funerary } from '@modules/funeraries/infra/typeorm/entities/Funerary'

@injectable()
export class UpdateFuneraryUseCase {
  constructor(
    @inject('FuneraryRepository')
    private funeraryRepository: IFuneraryRepository
  ) {}

  async execute({ id, ...data }: { id: string } & IUpdateFuneraryDTO): Promise<Funerary> {
    const funerary = await this.funeraryRepository.findById(id)
    if (!funerary) throw new AppError('Funerária não encontrada', 404)
    Object.assign(funerary, data)
    return this.funeraryRepository.save(funerary)
  }
}
