import crypto from 'crypto'
import { connection } from '../../database.js'

export class categoryModel {
  static async getAll() {
    const [access] = await connection.query('SELECT * FROM access;')
    return access
  }

  static async getById({ id }) {
    const [access] = await connection.query(
      'SELECT * FROM access WHERE id = ?;',
      [id]
    )

    if (access.length === 0) return null
    return access[0]
  }

  static async create({ input }) {
    const { idusers, idprofiles } = input

    // insert
    const [result] = await connection.query(
      `INSERT INTO access (idusers, idprofiles, create_at) VALUES (?, ?, NOW());`,
      [idusers, idprofiles]
    )

    console.log(result)
  }

  static async delete({ id }) {
    const [result] = await connection.query(
      'DELETE FROM access WHERE id = ?;',
      [id]
    )
    console.log(result)
  }

  static async update({ id, input }) {
    const [result] = await connection.query(
      'UPDATE access SET idusers = ?, idprofiles = ? WHERE id = ?;',
      [input.idusers, input.idprofiles, id]
    )
    console.log(result)
  }
}
