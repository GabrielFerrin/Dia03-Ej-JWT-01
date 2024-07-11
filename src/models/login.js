import pool from '../db.js'

const dropTable = async () => {
  let conn = null
  try {
    conn = await pool.getConnection()
    const query = 'DROP TABLE IF EXISTS login'
    const response = await conn.execute(query)
    return { sucess: true, status: 200, response }
  } catch (error) {
    return { sucess: false, status: 500, message: error.message }
  } finally {
    if (conn) conn.end()
  }
}

const createTable = async () => {
  let conn = null
  try {
    conn = await pool.getConnection()
    const query = `
      CREATE TABLE IF NOT EXISTS login 
      (
        user_id INT NOT NULL AUTO_INCREMENT,
        names VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        hash VARCHAR(255) NOT NULL,
        PRIMARY KEY (user_id)
      )
    `
    const response = await conn.execute(query)
    return { sucess: true, status: 200, response }
  } catch (error) {
    return { sucess: false, status: 500, message: error.message }
  } finally {
    if (conn) conn.end()
  }
}

export default { dropTable, createTable }
