import { inject, injectable } from 'tsyringe'
import { ICemeteryRepository } from '@modules/cemiteries/repositories/ICemeteryRepository'
import { IUpdateCemeteryDTO } from '@modules/cemiteries/dtos/IUpdateCemeteryDTO'
import { AppError } from '@shared/errors/AppError'
import { Cemetery } from '@modules/cemiteries/infra/typeorm/entities/Cemetery'

interface IRequest extends IUpdateCemeteryDTO {
  id: string
}

@injectable()
export class UpdateCemeteryUseCase {
  constructor(
    @inject('CemeteryRepository')
    private cemeteryRepository: ICemeteryRepository
  ) {}

  async execute({ id, ...data }: IRequest): Promise<Cemetery> {
    const cemetery = await this.cemeteryRepository.findById(id)
    if (!cemetery) throw new AppError('Cemitério não encontrado', 404)
    Object.assign(cemetery, data)
    return this.cemeteryRepository.save(cemetery)
  }
}
