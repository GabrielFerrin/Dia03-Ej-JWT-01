import { Router } from 'express'
import authC from '../controllers/auth.controller.js'

const router = Router()

router.post('/login', authC.login)
router.post('/register', authC.register)
router.get('/users', authC.getAllUsers)
router.get('/me', authC.me)

export default router
