import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateContractUseCase } from './CreateContractUseCase'
import { ContractMapper } from '@modules/contracts/mappers/ContractMapper'

export class CreateContractController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.user
    const {
      cemetery_id,
      funerary_id,
      body_location_type,
      body_city,
      body_neighbourhood,
      body_street,
      body_uf,
      body_number,
      funeral_city,
      funeral_date,
    } = req.body

    const useCase = container.resolve(CreateContractUseCase)
    const contract = await useCase.execute({
      user_id,
      cemetery_id,
      funerary_id,
      body_location_type,
      body_city,
      body_neighbourhood,
      body_street,
      body_uf,
      body_number,
      funeral_city,
      funeral_date,
    })
    return res.status(201).json(ContractMapper.toDTO(contract))
  }
}
