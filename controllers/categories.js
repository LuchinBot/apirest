//import { categoryModel } from '../models/database/category.js'
import { categoryModel } from '../models/mysql/category.js'
import {
  validateCategory,
  validatePartialCategory
} from '../schemas/categories.js'

export class CategoryController {
  static async getAll(req, res) {
    try {
      const categories = await categoryModel.getAll()
      res.json(categories)
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Server Error' })
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params
      const category = await categoryModel.getById({ id })

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
      const categoryData = { ...req.body, image: imageUrl }

      // Validar los datos de la categoría
      const result = validateCategory(categoryData)
      if (result.error) {
        return res.status(400).json({ error: result.error.errors })
      }

      // Crear la nueva categoría
      const newCategory = await categoryModel.create({ input: result.data })
      return res.json({ message: 'Category created', newCategory })
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Server Error' })
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params
      const result = await categoryModel.delete({ id })
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
    const categoryData = { ...req.body, image: imageUrl }
    try {
      const result = validatePartialCategory(categoryData)

      if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
      }
      const { id } = req.params

      const updateCategory = await categoryModel.update({
        id,
        input: result.data
      })
      return res.json({ message: 'Category updated', updateCategory })
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Server Error' })
    }
  }
}
