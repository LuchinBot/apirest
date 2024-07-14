import crypto from 'crypto'
import { connection } from '../../database.js'

export class accessModel {
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

    const [rows] = await connection.query('SELECT UUID() as uuid;')
    const uuid = rows[0].uuid
    const hash = crypto
      .createHash('md5')
      .update(uuid)
      .digest('hex')
      .substring(0, 12)

    // insert
    const [result] = await connection.query(
      `INSERT INTO access (id,idusers, idprofiles, create_at) VALUES (?,?, ?, NOW());`,
      [hash, idusers, idprofiles]
    )
    // Retornar un mensaje en json

    return 'access created'
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
