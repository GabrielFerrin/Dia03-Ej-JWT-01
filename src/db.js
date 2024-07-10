import { createPool } from 'mariadb'
import { DB_HOST, DB_PASS, DB_DB, DB_PORT, DB_USER } from './config.js'

export const pool = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_DB,
  port: DB_PORT,
  connectionLimit: 5
})

export default pool
