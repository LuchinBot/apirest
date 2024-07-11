import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  port: 3306,
  user: 'nodejs',
  password: '070121.070121',
  database: 'db_movies'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll({ genre }) {
    const [movies] = await connection.query(
      'SELECT * FROM genre WHERE name = ?;',
      [genre]
    )
    return movies
  }

  static async getById({ id }) {}

  static async create({ input }) {}

  static async delete({ id }) {}

  static async update({ id, input }) {}
}
