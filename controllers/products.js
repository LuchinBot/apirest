import { productModel } from '../models/mysql/product.js'
import { validateProduct, validatePartialProduct } from '../schemas/products.js'

export class ProductController {
  static async getAll(req, res) {
    try {
      const products = await productModel.getAll()
      res.json(products)
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Server Error' })
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params
      const category = await productModel.getById({ id })

      if (category) {
        res.json(category)
      } else {
        res.status(404).json({ message: 'Category not found' })
      }
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Server Error' })
    }
  }

  static async create(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' })
      }
      // Crear la URL de la imagen
      const imageUrl = `/uploads/${req.file.filename}`
      const productData = { ...req.body, image: imageUrl }

      // Validar los datos de la categoría
      const result = validateProduct(productData)
      if (result.error) {
        return res.status(400).json({ error: result.error.errors })
      }

      // Crear la nueva categoría
      const newProducts = await productModel.create({ input: result.data })
      return res.json({ message: 'Category created', newProducts })
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Server Error' })
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params
      const result = await productModel.delete({ id })
      if (result === false) {
        return res.status(404).json({ message: 'Category not found' })
      }
      return res.json({ message: 'Category deleted' })
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Server Error' })
    }
  }

  static async update(req, res) {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }
    // Crear la URL de la imagen
    const imageUrl = `/uploads/${req.file.filename}`
    const productData = { ...req.body, image: imageUrl }
    try {
      const result = validatePartialProduct(productData)

      if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
      }
      const { id } = req.params

      const updateProduct = await productModel.update({
        id,
        input: result.data
      })
      return res.json({ message: 'Category updated', updateProduct })
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Server Error' })
    }
  }
}
