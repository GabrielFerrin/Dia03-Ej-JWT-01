import loginM from '../models/login.js'

const dropTable = async (req, res) => {
  const response = await loginM.dropTable()
  res.status(response.status).json(response)
}

const createTable = async (req, res) => {
  const response = await loginM.createTable()
  res.status(response.status).json(response)
}

export default { dropTable, createTable }
