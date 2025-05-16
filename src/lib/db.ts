import mongoose, { ConnectOptions } from 'mongoose'

if (typeof process.env.MONGO_DB_USERNAME !== 'string' || process.env.MONGO_DB_USERNAME.length === 0) {
  throw new Error('MONGO_DB_USERNAME is not defined')
}

if (typeof process.env.MONGO_DB_PASSWORD !== 'string' || process.env.MONGO_DB_PASSWORD.length === 0) {
  throw new Error('MONGO_DB_PASSWORD is not defined')
}

if (typeof process.env.MONGO_DB_HOST !== 'string' || process.env.MONGO_DB_HOST.length === 0) {
  throw new Error('MONGO_DB_HOST is not defined')
}

if (typeof process.env.MONGO_DB_PARAMS !== 'string' || process.env.MONGO_DB_PARAMS.length === 0) {
  throw new Error('MONGO_DB_PARAMS is not defined')
}

if (typeof process.env.MONGO_DB_APP !== 'string' || process.env.MONGO_DB_APP.length === 0) {
  throw new Error('MONGO_DB_APP is not defined')
}

export const MONGO_DB_URI = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}/?${process.env.MONGO_DB_PARAMS}&appName=${process.env.MONGO_DB_APP}`

const clientOptions: ConnectOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true
  }
}

export const connect = async (): Promise<void> => {
  if (typeof MONGO_DB_URI !== 'string' || MONGO_DB_URI.length === 0) {
    throw new Error('MONGO_DB_URI is not defined in env')
  }

  try {
    await mongoose.connect(MONGO_DB_URI, clientOptions)
    console.log('Connected to MongoDB')

  } catch (error) {
    console.error(error)
    throw new Error('Failed to connect to MongoDB')
  }
}
