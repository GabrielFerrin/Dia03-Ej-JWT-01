import pool from '../db.js'
import jwt from 'jsonwebtoken'
import { SECRET } from '../config.js'

const getAllUsers = async () => {
  let conn = null
  try {
    conn = await pool.getConnection()
    const query = 'SELECT * FROM login'
    const response = await conn.execute(query)
    return { sucess: true, status: 200, response }
  } catch (error) {
    return { sucess: false, status: 500, message: error.message }
  }
}

const login = async ({ email, hash }) => {
  if (!email || !hash) {
    return { sucess: false, status: 401, message: 'Invalid credentials.' }
  }
  let conn = null
  try {
    conn = await pool.getConnection()
    const query = 'SELECT * FROM login WHERE email = ? AND hash = ?'
    const response = await conn.execute(query, [email, hash])
    if (response.length === 0) {
      return { sucess: false, status: 401, message: 'Invalid credentials.' }
    }
    console.log(response[0])
    const token = createSession(response[0].user_id)
    return { sucess: true, status: 200, message: 'Login successful.', token }
  } catch (error) {
    return { sucess: false, status: 500, message: error.message }
  } finally {
    if (conn) conn.end()
  }
}

const createSession = (userId) => {
  const token = jwt.sign({ userId }, SECRET, {
    expiresIn: '60s'
  })
  return token
}

const register = async (userId, email, hash) => {
  const result = await pool.query(
    'INSERT INTO login (user_id, email, hash) VALUES (?, ?, ?)',
    [userId, email, hash]
  )
  return result
}

const me = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET)
    console.log(decoded)
    return { success: true, status: 200, userId: decoded.userId }
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return { success: false, status: 401, message: 'Session expired.' }
    }
    return { success: false, status: 500, message: error.message }
  }
}

export default { login, register, getAllUsers, createSession, me }
