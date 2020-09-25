import express from 'express'
import morgan from 'morgan'

import { createRoles } from './libs/initialSetup'
import pkg from '../package.json'
import productsRoutes from './routes/products.routes'
import authRoutes from './routes/auth.routes'

const app = express()
createRoles()

app.use(morgan('dev'))
app.use(express.json())
app.set('pkg', pkg)

app.get('/', (req, res)=> {
  res.json({
    name: app.get('pkg').name,
    author: app.get('pkg').author,
    description: app.get('pkg').description,
    version: app.get('pkg').version
  })
})

app.use('/api/v1/products', productsRoutes)
app.use('/api/v1/auth', authRoutes)

export default app
