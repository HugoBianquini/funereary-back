import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UploadCertificateUseCase } from './UploadCertificateUseCase'
import { ContractMapper } from '@modules/contracts/mappers/ContractMapper'
import { AppError } from '@shared/errors/AppError'

export class UploadCertificateController {
  async handle(req: Request, res: Response): Promise<Response> {
    if (!req.file) throw new AppError('Arquivo não enviado', 400)
    const { id: contractId } = req.params
    const { id: userId } = req.user
    const useCase = container.resolve(UploadCertificateUseCase)
    const contract = await useCase.execute({ contractId, userId, filename: req.file.filename })
    return res.json(ContractMapper.toDTO(contract))
  }
}
