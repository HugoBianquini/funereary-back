import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ShowFuneraryUseCase } from './ShowFuneraryUseCase'
import { FuneraryMapper } from '@modules/funeraries/mappers/FuneraryMapper'

export class ShowFuneraryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const useCase = container.resolve(ShowFuneraryUseCase)
    const funerary = await useCase.execute(id)
    return res.json(FuneraryMapper.toDTO(funerary))
  }
}
