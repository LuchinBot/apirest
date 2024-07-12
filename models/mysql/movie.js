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
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()

      // get genre for id
      const [genres] = await connection.query(
        'SELECT * FROM genre WHERE LOWER(name) = ?;',
        [lowerCaseGenre]
      )

      if (genres.length === 0) return []

      const [{ id }] = genres

      // get movies for genre
      const [movies] = await connection.query(
        'SELECT * FROM movies WHERE genre_id = ?;',
        [id]
      )
      return ['Todas las peliculas con el genero']
    } else {
      const [movies] = await connection.query('SELECT * FROM movies;')
      return ['Todas las peliculas']
    }
  }

  static async getById({ id }) {
    const [movies] = await connection.query(
      'SELECT * FROM movies WHERE id = ?;',
      [id]
    )

    if (movies.length === 0) return null
    return movies[0]
  }

  static async create({ input }) {
    const {
      genre: genreInput,
      title,
      year,
      duration,
      director,
      rate,
      poster
    } = input

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')

    const [{ uuid }] = uuidResult

    // insert

    const [result] = await connection.query(
      `INSERT INTO movies (id,title, year, duration, director, rate, poster) VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?,?);`,
      [title, year, duration, director, rate, poster]
    )

    console.log(result)
  }

  static async delete({ id }) {}

  static async update({ id, input }) {}
}
