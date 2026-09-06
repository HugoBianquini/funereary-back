import { Router } from 'express'
import { CreateFuneraryController } from '@modules/funeraries/useCases/createFunerary/CreateFuneraryController'
import { ListFunerariesController } from '@modules/funeraries/useCases/listFuneraries/ListFunerariesController'
import { ShowFuneraryController } from '@modules/funeraries/useCases/showFunerary/ShowFuneraryController'
import { UpdateFuneraryController } from '@modules/funeraries/useCases/updateFunerary/UpdateFuneraryController'
import { DeleteFuneraryController } from '@modules/funeraries/useCases/deleteFunerary/DeleteFuneraryController'
import { ensureAuthenticated } from '@shared/middlewares/ensureAuthenticated'

export const funerariesRouter = Router()

const createFuneraryController = new CreateFuneraryController()
const listFunerariesController = new ListFunerariesController()
const showFuneraryController = new ShowFuneraryController()
const updateFuneraryController = new UpdateFuneraryController()
const deleteFuneraryController = new DeleteFuneraryController()

funerariesRouter.get('/', (req, res) => listFunerariesController.handle(req, res))
funerariesRouter.get('/:id', (req, res) => showFuneraryController.handle(req, res))
funerariesRouter.post('/', ensureAuthenticated, (req, res) => createFuneraryController.handle(req, res))
funerariesRouter.put('/:id', ensureAuthenticated, (req, res) => updateFuneraryController.handle(req, res))
funerariesRouter.delete('/:id', ensureAuthenticated, (req, res) => deleteFuneraryController.handle(req, res))
