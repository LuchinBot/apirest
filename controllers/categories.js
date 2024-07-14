//import { categoryModel } from '../models/database/category.js'
import { categoryModel } from '../models/mysql/category.js'
import {
  validateCategory,
  validatePartialCategory
} from '../schemas/categories.js'

export class CategoryController {
  static async getAll(req, res) {
    const { genre } = req.query
    const categories = await categoryModel.getAll({ genre })
    res.json(categories)
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
    // Añadir la URL de la imagen al cuerpo de la solicitud
    const imageUrl = `/uploads/${req.file.filename}`
    const categoryData = { ...req.body, image: imageUrl }

    // Validar los datos de la categoría
    const result = validateCategory(categoryData)
    if (result.error) {
      return res.status(400).json({ error: result.error.errors })
    }

    // Crear la nueva categoría
    const newCategory = await categoryModel.create({ input: result.data })
    res.status(201).json(newCategory)
  }

  static async delete(req, res) {
    const { id } = req.params
    const result = await categoryModel.delete({ id })
    if (result === false) {
      return res.status(404).json({ message: 'category not found' })
    }
    return res.json({ message: 'category deleted' })
  }

  static async update(req, res) {
    const result = validatePartialCategory(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params

    const updateCategory = await categoryModel.update({
      id,
      input: result.data
    })
    return res.json(updateCategory)
  }
}
