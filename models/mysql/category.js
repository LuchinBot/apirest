import crypto from 'crypto'
import { connection } from '../../database.js'

export class categoryModel {
  static async getAll() {
    const [categories] = await connection.query('SELECT * FROM categories;')
    return categories
  }

  static async getById({ id }) {
    const [categories] = await connection.query(
      'SELECT * FROM categories WHERE id = ?;',
      [id]
    )
    if (categories.length === 0) return null
    return categories[0]
  }

  static async create({ input }) {
    const { title, slug, description, image } = input

    const [rows] = await connection.query('SELECT UUID() as uuid;')
    const uuid = rows[0].uuid
    const hash = crypto
      .createHash('md5')
      .update(uuid)
      .digest('hex')
      .substring(0, 12)

    // insert
    const [result] = await connection.query(
      `INSERT INTO categories (id,title,slug, description, image, create_at) VALUES (?, ?, ?, ?, ?, NOW());`,
      [hash, title, slug, description, image]
    )

    console.log(result)
  }

  static async delete({ id }) {
    const [result] = await connection.query(
      'DELETE FROM categories WHERE id = ?;',
      [id]
    )
    console.log(result)
  }

  static async update({ id, input }) {
    console.log(input)
    const [result] = await connection.query(
      'UPDATE categories SET title=?, slug = ?, description = ?, image = ? WHERE id = ?;',
      [input.title, input.slug, input.description, input.image, id]
    )
    console.log(result)
  }
}
