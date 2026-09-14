import { inject, injectable } from 'tsyringe'
import { IFuneraryRepository } from '@modules/funeraries/repositories/IFuneraryRepository'
import { AppError } from '@shared/errors/AppError'

@injectable()
export class DeleteFuneraryUseCase {
  constructor(
    @inject('FuneraryRepository')
    private funeraryRepository: IFuneraryRepository
  ) {}

  async execute(id: string): Promise<void> {
    const funerary = await this.funeraryRepository.findById(id)
    if (!funerary) throw new AppError('Funerária não encontrada', 404)
    funerary.active = false
    await this.funeraryRepository.save(funerary)
  }
}
