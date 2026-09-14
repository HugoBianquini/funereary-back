import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateFuneraryUseCase } from './CreateFuneraryUseCase'
import { FuneraryMapper } from '@modules/funeraries/mappers/FuneraryMapper'

export class CreateFuneraryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(CreateFuneraryUseCase)
    const funerary = await useCase.execute(req.body)
    return res.status(201).json(FuneraryMapper.toDTO(funerary))
  }
}
