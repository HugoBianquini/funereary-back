import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListFunerariesUseCase } from './ListFunerariesUseCase'
import { FuneraryMapper } from '@modules/funeraries/mappers/FuneraryMapper'

export class ListFunerariesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { city, active } = req.query
    const useCase = container.resolve(ListFunerariesUseCase)
    const funeraries = await useCase.execute({
      city: city as string | undefined,
      active: active !== undefined ? active === 'true' : undefined,
    })
    return res.json(funeraries.map(FuneraryMapper.toDTO))
  }
}
