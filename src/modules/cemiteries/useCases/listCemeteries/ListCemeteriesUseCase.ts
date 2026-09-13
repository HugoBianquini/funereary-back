import { inject, injectable } from 'tsyringe'
import { ICemeteryRepository } from '@modules/cemiteries/repositories/ICemeteryRepository'
import { Cemetery } from '@modules/cemiteries/infra/typeorm/entities/Cemetery'

interface IRequest {
  city?: string
  active?: boolean
}

@injectable()
export class ListCemeteriesUseCase {
  constructor(
    @inject('CemeteryRepository')
    private cemeteryRepository: ICemeteryRepository
  ) {}

  async execute({ city, active }: IRequest): Promise<Cemetery[]> {
    return this.cemeteryRepository.findAll({ city, active })
  }
}
