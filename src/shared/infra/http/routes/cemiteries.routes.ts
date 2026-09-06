import { Router } from 'express'
import { CreateCemeteryController } from '@modules/cemiteries/useCases/createCemetery/CreateCemeteryController'
import { ListCemeteriesController } from '@modules/cemiteries/useCases/listCemeteries/ListCemeteriesController'
import { ShowCemeteryController } from '@modules/cemiteries/useCases/showCemetery/ShowCemeteryController'
import { UpdateCemeteryController } from '@modules/cemiteries/useCases/updateCemetery/UpdateCemeteryController'
import { DeleteCemeteryController } from '@modules/cemiteries/useCases/deleteCemetery/DeleteCemeteryController'
import { ensureAuthenticated } from '@shared/middlewares/ensureAuthenticated'

export const cemiteriesRouter = Router()

const createCemeteryController = new CreateCemeteryController()
const listCemeteriesController = new ListCemeteriesController()
const showCemeteryController = new ShowCemeteryController()
const updateCemeteryController = new UpdateCemeteryController()
const deleteCemeteryController = new DeleteCemeteryController()

cemiteriesRouter.get('/', (req, res) => listCemeteriesController.handle(req, res))
cemiteriesRouter.get('/:id', (req, res) => showCemeteryController.handle(req, res))
cemiteriesRouter.post('/', ensureAuthenticated, (req, res) => createCemeteryController.handle(req, res))
cemiteriesRouter.put('/:id', ensureAuthenticated, (req, res) => updateCemeteryController.handle(req, res))
cemiteriesRouter.delete('/:id', ensureAuthenticated, (req, res) => deleteCemeteryController.handle(req, res))
