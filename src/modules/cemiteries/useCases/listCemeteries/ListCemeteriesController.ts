import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListCemeteriesUseCase } from './ListCemeteriesUseCase'
import { CemeteryMapper } from '@modules/cemiteries/mappers/CemeteryMapper'

export class ListCemeteriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { city, active } = req.query
    const useCase = container.resolve(ListCemeteriesUseCase)
    const cemeteries = await useCase.execute({
      city: city as string | undefined,
      active: active !== undefined ? active === 'true' : undefined,
    })
    return res.json(cemeteries.map(CemeteryMapper.toDTO))
  }
}
