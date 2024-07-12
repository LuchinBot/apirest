import { Router } from 'express'
import { CategoryController } from '../controllers/categories.js'

// Routes
export const categoriesRouter = Router()

categoriesRouter.get('/', CategoryController.getAll)
categoriesRouter.get('/:id', CategoryController.getById)
categoriesRouter.post('/', CategoryController.create)
categoriesRouter.delete('/:id', CategoryController.delete)
categoriesRouter.patch('/:id', CategoryController.update)
