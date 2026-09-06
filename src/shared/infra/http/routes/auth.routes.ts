import { Router } from 'express'
import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController'
import { AuthenticateUserController } from '@modules/users/useCases/authenticateUser/AuthenticateUserController'
import { ProfileUserController } from '@modules/users/useCases/profileUser/ProfileUserController'
import { ensureAuthenticated } from '@shared/middlewares/ensureAuthenticated'

export const authRouter = Router()

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const profileUserController = new ProfileUserController()

authRouter.post('/register', (req, res) => createUserController.handle(req, res))
authRouter.post('/login', (req, res) => authenticateUserController.handle(req, res))
authRouter.get('/profile', ensureAuthenticated, (req, res) => profileUserController.handle(req, res))
