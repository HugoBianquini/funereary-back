import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateCemeteryUseCase } from './UpdateCemeteryUseCase'
import { CemeteryMapper } from '@modules/cemiteries/mappers/CemeteryMapper'

export class UpdateCemeteryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const useCase = container.resolve(UpdateCemeteryUseCase)
    const cemetery = await useCase.execute({ id, ...req.body })
    return res.json(CemeteryMapper.toDTO(cemetery))
  }
}
