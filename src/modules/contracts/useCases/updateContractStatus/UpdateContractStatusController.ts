import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateContractStatusUseCase } from './UpdateContractStatusUseCase'
import { ContractMapper } from '@modules/contracts/mappers/ContractMapper'

export class UpdateContractStatusController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { status } = req.body
    const useCase = container.resolve(UpdateContractStatusUseCase)
    const contract = await useCase.execute({ id, status })
    return res.json(ContractMapper.toDTO(contract))
  }
}
