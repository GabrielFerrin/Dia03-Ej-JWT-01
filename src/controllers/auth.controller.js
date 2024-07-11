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
  const { names, email, hash } = req.body
  console.log(req.body)
  if (!names || !email || !hash) {
    return res.status(401).json({ message: 'Faltan datos.' })
  }
  try {
    await authM.register(names, email, hash)
    const token = authM.createSession(names)
    res.status(201)
      .json({ success: true, message: 'Usuario encontrado!', names, token })
  } catch (error) {
    res.status(500)
      .json({ success: false, message: 'Error al registrar usuario', error: error.message })
  }
}

const me = (req, res) => {
  const response = authM.me(req.headers.authorization)
  res.status(response.status).json(response)
}

export default { login, register, getAllUsers, me }
