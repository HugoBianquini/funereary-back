import { inject, injectable } from 'tsyringe'
import { ICemeteryRepository } from '@modules/cemiteries/repositories/ICemeteryRepository'
import { AppError } from '@shared/errors/AppError'

@injectable()
export class DeleteCemeteryUseCase {
  constructor(
    @inject('CemeteryRepository')
    private cemeteryRepository: ICemeteryRepository
  ) {}

  async execute(id: string): Promise<void> {
    const cemetery = await this.cemeteryRepository.findById(id)
    if (!cemetery) throw new AppError('Cemitério não encontrado', 404)
    cemetery.active = false
    await this.cemeteryRepository.save(cemetery)
  }
}
