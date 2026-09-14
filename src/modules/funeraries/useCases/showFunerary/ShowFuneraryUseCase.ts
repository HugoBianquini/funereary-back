import { inject, injectable } from 'tsyringe'
import { IFuneraryRepository } from '@modules/funeraries/repositories/IFuneraryRepository'
import { AppError } from '@shared/errors/AppError'
import { Funerary } from '@modules/funeraries/infra/typeorm/entities/Funerary'

@injectable()
export class ShowFuneraryUseCase {
  constructor(
    @inject('FuneraryRepository')
    private funeraryRepository: IFuneraryRepository
  ) {}

  async execute(id: string): Promise<Funerary> {
    const funerary = await this.funeraryRepository.findById(id)
    if (!funerary) throw new AppError('Funerária não encontrada', 404)
    return funerary
  }
}
