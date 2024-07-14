import mysql from 'mysql2/promise'
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

export { connection }
