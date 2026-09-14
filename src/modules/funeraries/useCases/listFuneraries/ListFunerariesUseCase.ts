import { inject, injectable } from 'tsyringe'
import { IFuneraryRepository } from '@modules/funeraries/repositories/IFuneraryRepository'
import { Funerary } from '@modules/funeraries/infra/typeorm/entities/Funerary'

@injectable()
export class ListFunerariesUseCase {
  constructor(
    @inject('FuneraryRepository')
    private funeraryRepository: IFuneraryRepository
  ) {}

  async execute({ city, active }: { city?: string; active?: boolean }): Promise<Funerary[]> {
    return this.funeraryRepository.findAll({ city, active })
  }
}
