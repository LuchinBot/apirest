import crypto from 'crypto'
import { connection } from '../../database.js'

const [rows] = await connection.query('SELECT UUID() as uuid;')
const uuid = rows[0].uuid
const hash = crypto
  .createHash('md5')
  .update(uuid)
  .digest('hex')
  .substring(0, 12)

module.exports = { hash }
