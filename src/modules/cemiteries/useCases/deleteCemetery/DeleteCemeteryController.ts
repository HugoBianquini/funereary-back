import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteCemeteryUseCase } from './DeleteCemeteryUseCase'

export class DeleteCemeteryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const useCase = container.resolve(DeleteCemeteryUseCase)
    await useCase.execute(id)
    return res.status(204).send()
  }
}
