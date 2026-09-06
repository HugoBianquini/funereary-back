import { Router } from 'express'
import { authRouter } from './auth.routes'
import { cemiteriesRouter } from './cemiteries.routes'
import { funerariesRouter } from './funeraries.routes'
import { contractsRouter } from './contracts.routes'
import { paymentsRouter } from './payments.routes'

export const router = Router()

router.use('/auth', authRouter)
router.use('/cemiteries', cemiteriesRouter)
router.use('/funeraries', funerariesRouter)
router.use('/contracts', contractsRouter)
router.use('/payments', paymentsRouter)
