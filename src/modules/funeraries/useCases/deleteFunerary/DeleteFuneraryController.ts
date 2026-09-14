import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteFuneraryUseCase } from './DeleteFuneraryUseCase'

export class DeleteFuneraryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const useCase = container.resolve(DeleteFuneraryUseCase)
    await useCase.execute(id)
    return res.status(204).send()
  }
}
