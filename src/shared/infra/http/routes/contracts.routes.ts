import { Router } from 'express'
import { CreateContractController } from '@modules/contracts/useCases/createContract/CreateContractController'
import { ListContractsController } from '@modules/contracts/useCases/listContracts/ListContractsController'
import { ShowContractController } from '@modules/contracts/useCases/showContract/ShowContractController'
import { UpdateContractStatusController } from '@modules/contracts/useCases/updateContractStatus/UpdateContractStatusController'
import { UploadCertificateController } from '@modules/contracts/useCases/uploadCertificate/UploadCertificateController'
import { ensureAuthenticated } from '@shared/middlewares/ensureAuthenticated'
import { uploadCertificate } from '../multer'

export const contractsRouter = Router()

const createContractController = new CreateContractController()
const listContractsController = new ListContractsController()
const showContractController = new ShowContractController()
const updateContractStatusController = new UpdateContractStatusController()
const uploadCertificateController = new UploadCertificateController()

contractsRouter.use(ensureAuthenticated)

contractsRouter.post('/', (req, res) => createContractController.handle(req, res))
contractsRouter.get('/', (req, res) => listContractsController.handle(req, res))
contractsRouter.get('/:id', (req, res) => showContractController.handle(req, res))
contractsRouter.patch('/:id/status', (req, res) => updateContractStatusController.handle(req, res))
contractsRouter.post('/:id/certificate', uploadCertificate.single('certificate'), (req, res) =>
  uploadCertificateController.handle(req, res)
)
