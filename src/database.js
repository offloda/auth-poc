import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const port = process.env.MONGO_DB_PORT
const host = process.env.MONGO_DB_HOST
const name = process.env.MONGO_DB_NAME
const authSource = process.env.MONGO_DB_AUTH_SOURCE
const pass = process.env.MONGO_DB_PASSWORD
const user = process.env.MONGO_DB_USER

mongoose.connect(`mongodb://${host}:${port}/${name}`, {
  poolSize: 10,
  authSource: authSource,
  user: user,
  pass: pass,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
})
  .then(db => console.log('DB is connected'))
  .catch(err => console.log(err))
