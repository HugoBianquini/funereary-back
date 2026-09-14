import { inject, injectable } from 'tsyringe'
import { IFuneraryRepository } from '@modules/funeraries/repositories/IFuneraryRepository'
import { Funerary } from '@modules/funeraries/infra/typeorm/entities/Funerary'
import { ICreateFuneraryDTO } from '@modules/funeraries/dtos/ICreateFuneraryDTO'

@injectable()
export class CreateFuneraryUseCase {
  constructor(
    @inject('FuneraryRepository')
    private funeraryRepository: IFuneraryRepository
  ) {}

  async execute(data: ICreateFuneraryDTO): Promise<Funerary> {
    return this.funeraryRepository.create(data)
  }
}
