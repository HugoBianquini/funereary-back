import { inject, injectable } from 'tsyringe'
import { IContractRepository } from '@modules/contracts/repositories/IContractRepository'
import { ICemeteryRepository } from '@modules/cemiteries/repositories/ICemeteryRepository'
import { IFuneraryRepository } from '@modules/funeraries/repositories/IFuneraryRepository'
import { AppError } from '@shared/errors/AppError'
import { Contract } from '@modules/contracts/infra/typeorm/entities/Contract'
import { BodyLocationType } from '@modules/contracts/dtos/ICreateContractDTO'

interface IRequest {
  user_id: string
  cemetery_id: string
  funerary_id: string
  body_location_type: BodyLocationType
  body_city: string
  body_neighbourhood: string
  body_street?: string
  body_uf?: string
  body_number?: number
  funeral_city: string
  funeral_date: string
}

@injectable()
export class CreateContractUseCase {
  constructor(
    @inject('ContractRepository')
    private contractRepository: IContractRepository,
    @inject('CemeteryRepository')
    private cemeteryRepository: ICemeteryRepository,
    @inject('FuneraryRepository')
    private funeraryRepository: IFuneraryRepository
  ) {}

  async execute({ user_id, cemetery_id, funerary_id, ...rest }: IRequest): Promise<Contract> {
    const cemetery = await this.cemeteryRepository.findById(cemetery_id)
    if (!cemetery) throw new AppError('Cemitério não encontrado', 404)

    const funerary = await this.funeraryRepository.findById(funerary_id)
    if (!funerary) throw new AppError('Funerária não encontrada', 404)

    const total_price = Number(cemetery.price) + Number(funerary.price)

    return this.contractRepository.create({
      user_id,
      cemetery_id,
      funerary_id,
      total_price,
      ...rest,
    })
  }
}
