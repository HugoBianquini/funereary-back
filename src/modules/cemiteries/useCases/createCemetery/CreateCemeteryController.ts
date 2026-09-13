import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateCemeteryUseCase } from './CreateCemeteryUseCase'
import { CemeteryMapper } from '@modules/cemiteries/mappers/CemeteryMapper'

export class CreateCemeteryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, city, neighbourhood, street, lat, lng, price, image_url, active } = req.body
    const useCase = container.resolve(CreateCemeteryUseCase)
    const cemetery = await useCase.execute({ name, city, neighbourhood, street, lat, lng, price, image_url, active })
    return res.status(201).json(CemeteryMapper.toDTO(cemetery))
  }
}
