import { Router } from 'express'
import { AccessController } from '../controllers/access.js'

// Routes
export const accessRouter = Router()

accessRouter.get('/', AccessController.getAll)
accessRouter.get('/:id', AccessController.getById)
accessRouter.post('/', AccessController.create)
accessRouter.delete('/:id', AccessController.delete)
accessRouter.patch('/:id', AccessController.update)
