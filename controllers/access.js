import { accessModel } from '../models/mysql/access.js'

export class AccessController {
  static async getAll(req, res) {
    const access = await accessModel.getAll()
    res.json(access)
  }

  static async getById(req, res) {
    try {
      const { id } = req.params
      const access = await accessModel.getById({ id })

      if (access) {
        res.json(access)
      } else {
        res.status(404).json({ message: 'access not found' })
      }
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Server Error' })
    }
  }

  static async create(req, res) {
    const accessData = { ...req.body }
    const newaccess = await accessModel.create({ input: accessData.data })
    res.status(201).json(newaccess)
  }

  static async delete(req, res) {
    const { id } = req.params
    const result = await accessModel.delete({ id })
    if (result === false) {
      return res.status(404).json({ message: 'access not found' })
    }
    return res.json({ message: 'access deleted' })
  }

  static async update(req, res) {
    const result = req.body

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params

    const updateaccess = await accessModel.update({
      id,
      input: result.data
    })
    return res.json(updateaccess)
  }
}
