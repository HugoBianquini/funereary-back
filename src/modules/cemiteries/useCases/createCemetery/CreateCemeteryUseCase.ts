import { inject, injectable } from 'tsyringe'
import { ICemeteryRepository } from '@modules/cemiteries/repositories/ICemeteryRepository'
import { Cemetery } from '@modules/cemiteries/infra/typeorm/entities/Cemetery'

interface IRequest {
  name: string
  city: string
  neighbourhood: string
  street?: string
  lat?: number
  lng?: number
  price: number
  image_url?: string
  active?: boolean
}

@injectable()
export class CreateCemeteryUseCase {
  constructor(
    @inject('CemeteryRepository')
    private cemeteryRepository: ICemeteryRepository
  ) {}

  async execute(data: IRequest): Promise<Cemetery> {
    return this.cemeteryRepository.create(data)
  }
}
