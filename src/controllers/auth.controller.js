import authM from '../models/auth.js'

const getAllUsers = async (req, res) => {
  const response = await authM.getAllUsers()
  res.status(response.status).json(response)
}

const login = async (req, res) => {
  const response = await authM.login(req.body)
  res.status(response.status).json(response)
}

const register = async (req, res) => {
  const { userId, email, hash } = req.body
  if (!userId || !email || !hash) {
    return res.status(401).json({ message: 'Invalid credentials.' })
  }
  try {
    await authM.register(userId, email, hash)
    console.log(userId)
    const token = authM.createSession(userId)
    res.status(201)
      .json({ message: 'Usuario encontrado!', userId, token })
  } catch (error) {
    res.status(500)
      .json({ message: 'Usuario incorrecto', error: error.stack })
  }
}

const me = (req, res) => {
  const response = authM.me(req.headers.authorization)
  res.status(response.status).json(response)
}

export default { login, register, getAllUsers, me }
