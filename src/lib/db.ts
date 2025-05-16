
import mongoose, { ConnectOptions } from 'mongoose'

if (typeof process.env.MONGODB_USERNAME !== 'string' || process.env.MONGODB_USERNAME.length === 0) {
  throw new Error('MONGODB_USERNAME must be set')
}

if (typeof process.env.MONGODB_PASSWORD !== 'string' || process.env.MONGODB_PASSWORD.length === 0) {
  throw new Error('MONGODB_USER and MONGODB_PASSWORD must be set')
}

if (typeof process.env.MONGODB_HOST !== 'string' || process.env.MONGODB_HOST.length === 0) {
  throw new Error('MONGODB_HOST must be set')
}
if (typeof process.env.MONGODB_PARAMS !== 'string' || process.env.MONGODB_PARAMS.length === 0) {
  console.log({ MONGODBDB_PARAMS: process.env.MONGODBDB_PARAMS })
  throw new Error('MONGODBDB_PARAMS must be set')
}
if (typeof process.env.MONGODB_APP_NAME !== 'string' || process.env.MONGODB_APP_NAME.length === 0) {
  throw new Error('MONGODB_APP_NAME must be set')
}

const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_PARAMS}&appName=${process.env.MONGODB_APP_NAME}`

const clientOptions: ConnectOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true
  }
}

export const connect = async (): Promise<void> => {
  if (typeof MONGODB_URI !== 'string' || MONGODB_URI.length === 0) {
    throw new Error('MONGODB_URI must be set')
  }
  try {
    console.log(MONGODB_URI)
    await mongoose.connect(MONGODB_URI, clientOptions)
    console.log('MongoDB connected')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw new Error('MongoDB connection error')
  }
}

export const disconnect = async (): Promise<void> => {
  try {
    await mongoose.connection.close()
    console.log('MongoDB disconnected')
  } catch (error) {
    console.error('MongoDB disconnection error:', error)
    throw new Error('MongoDB disconnection error')
  }
}
