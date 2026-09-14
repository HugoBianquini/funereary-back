import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ShowContractUseCase } from './ShowContractUseCase'
import { ContractMapper } from '@modules/contracts/mappers/ContractMapper'

export class ShowContractController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { id: userId } = req.user
    const useCase = container.resolve(ShowContractUseCase)
    const contract = await useCase.execute(id, userId)
    return res.json(ContractMapper.toDTO(contract))
  }
}
