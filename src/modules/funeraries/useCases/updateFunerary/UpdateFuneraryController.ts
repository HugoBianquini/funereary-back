import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateFuneraryUseCase } from './UpdateFuneraryUseCase'
import { FuneraryMapper } from '@modules/funeraries/mappers/FuneraryMapper'

export class UpdateFuneraryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const useCase = container.resolve(UpdateFuneraryUseCase)
    const funerary = await useCase.execute({ id, ...req.body })
    return res.json(FuneraryMapper.toDTO(funerary))
  }
}
