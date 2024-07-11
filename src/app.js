import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes.js'
import loginRoutes from './routes/login.routes.js'
import { corsMiddleware, corsOptions } from './middlewares/cors.js'

const app = express()

app.use(corsMiddleware)
app.options('*', corsOptions)
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/auth', authRoutes)

// tabla login
app.use('/api/login', loginRoutes)

export default app
