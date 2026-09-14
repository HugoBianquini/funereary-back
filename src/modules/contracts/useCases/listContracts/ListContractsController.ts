import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListContractsUseCase } from './ListContractsUseCase'
import { ContractMapper } from '@modules/contracts/mappers/ContractMapper'

export class ListContractsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req.user
    const useCase = container.resolve(ListContractsUseCase)
    const contracts = await useCase.execute(userId)
    return res.json(contracts.map(ContractMapper.toDTO))
  }
}
