import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ShowCemeteryUseCase } from './ShowCemeteryUseCase'
import { CemeteryMapper } from '@modules/cemiteries/mappers/CemeteryMapper'

export class ShowCemeteryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const useCase = container.resolve(ShowCemeteryUseCase)
    const cemetery = await useCase.execute(id)
    return res.json(CemeteryMapper.toDTO(cemetery))
  }
}
