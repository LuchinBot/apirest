import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

const config = {
  host: 'localhost',
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}

const connection = await mysql.createConnection(config)

export { connection }
