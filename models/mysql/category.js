import mysql from 'mysql2/promise'
import crypto from 'crypto'

const config = {
  host: 'localhost',
  port: 3306,
  user: 'nodejs',
  password: '070121.070121',
  database: 'db_kk'
}
const configServer = {
  host: 'localhost',
  port: 3306,
  user: 'qyvwiiui_admin',
  password: 'Notshethekey1.',
  database: 'qyvwiiui_kk'
}

const connection = await mysql.createConnection(config)

export class categoryModel {
  static async getAll({ genre }) {
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
    const { description, image } = input

    const [rows] = await connection.query('SELECT UUID() as uuid;')
    const uuid = rows[0].uuid
    const hash = crypto
      .createHash('md5')
      .update(uuid)
      .digest('hex')
      .substring(0, 12)

    // insert
    const [result] = await connection.query(
      `INSERT INTO categories (id, description, image, create_at) VALUES (?, ?, ?, NOW());`,
      [hash, description, image]
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
    const [result] = await connection.query(
      'UPDATE categories SET description = ?, image = ? WHERE id = ?;',
      [input.description, input.image, id]
    )
    console.log(result)
  }
}
