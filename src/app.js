import express from 'express'
import morgan from 'morgan'

import { createRoles } from './libs/initialSetup'
import productsRoutes from './routes/products.routes'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'

const app = express()
createRoles()

app.use(morgan('dev'))
app.use(express.json())

app.use('/api/v1/products', productsRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', userRoutes)

export default app
