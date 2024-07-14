import { Router } from 'express'
import { AccessController } from '../controllers/access.js'

// Routes
export const categoriesRouter = Router()

categoriesRouter.get('/', AccessController.getAll)
categoriesRouter.get('/:id', AccessController.getById)
categoriesRouter.post('/', AccessController.create)
categoriesRouter.delete('/:id', AccessController.delete)
categoriesRouter.patch('/:id', AccessController.update)
