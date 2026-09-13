import { inject, injectable } from 'tsyringe'
import { ICemeteryRepository } from '@modules/cemiteries/repositories/ICemeteryRepository'
import { AppError } from '@shared/errors/AppError'
import { Cemetery } from '@modules/cemiteries/infra/typeorm/entities/Cemetery'

@injectable()
export class ShowCemeteryUseCase {
  constructor(
    @inject('CemeteryRepository')
    private cemeteryRepository: ICemeteryRepository
  ) {}

  async execute(id: string): Promise<Cemetery> {
    const cemetery = await this.cemeteryRepository.findById(id)
    if (!cemetery) throw new AppError('Cemitério não encontrado', 404)
    return cemetery
  }
}
