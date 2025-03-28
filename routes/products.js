import { Router } from 'express'
import { upload } from '../middlewares/multer.js'
import { ProductController } from '../controllers/products.js'

// Routes
export const productsRouter = Router()

productsRouter.get('/', ProductController.getAll)
productsRouter.get('/:id', ProductController.getById)
productsRouter.post('/', upload.single('image'), ProductController.create)
productsRouter.delete('/:id', ProductController.delete)
productsRouter.patch('/:id', upload.single('image'), ProductController.update)
