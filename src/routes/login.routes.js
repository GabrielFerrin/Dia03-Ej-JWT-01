import { Router } from 'express'
import loginC from '../controllers/login.controller.js'

const router = Router()

router.post('/eliminar', loginC.dropTable)
router.post('/crear', loginC.createTable)

export default router
