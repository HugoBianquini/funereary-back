import { Router } from 'express'
import { CreatePaymentController } from '@modules/payments/useCases/createPayment/CreatePaymentController'
import { ListPaymentsByContractController } from '@modules/payments/useCases/listPaymentsByContract/ListPaymentsByContractController'
import { ensureAuthenticated } from '@shared/middlewares/ensureAuthenticated'

export const paymentsRouter = Router()

const createPaymentController = new CreatePaymentController()
const listPaymentsByContractController = new ListPaymentsByContractController()

paymentsRouter.use(ensureAuthenticated)

paymentsRouter.post('/', (req, res) => createPaymentController.handle(req, res))
paymentsRouter.get('/contract/:contractId', (req, res) => listPaymentsByContractController.handle(req, res))
