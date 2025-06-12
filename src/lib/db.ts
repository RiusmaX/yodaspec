import mongoose, { ConnectOptions } from 'mongoose'

if (typeof process.env.MONGODB_USERNAME !== 'string' || process.env.MONGODB_USERNAME.length === 0) {
  throw new Error('MONGODB_USERNAME is not defined in environment variables')
}

if (typeof process.env.MONGODB_PASSWORD !== 'string' || process.env.MONGODB_PASSWORD.length === 0) {
  throw new Error('MONGODB_PASSWORD is not defined in environment variables')
}

if (typeof process.env.MONGODB_HOST !== 'string' || process.env.MONGODB_HOST.length === 0) {
  throw new Error('MONGODB_HOST is not defined in environment variables')
}

if (typeof process.env.MONGODB_PARAMS !== 'string' || process.env.MONGODB_PARAMS.length === 0) {
  throw new Error('MONGODB_PARAMS is not defined in environment variables')
}

if (typeof process.env.MONGODB_APP !== 'string' || process.env.MONGODB_APP.length === 0) {
  throw new Error('MONGODB_APP is not defined in environment variables')
}

export const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_PARAMS}&appName=${process.env.MONGODB_APP}`

const clientOptions: ConnectOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true
  }
}

const connect = async (): Promise<void> => {
  if (typeof MONGODB_URI !== 'string' || MONGODB_URI.length === 0) {
    throw new Error('MONGODB_URI is not defined in environment variables')
  }
  try {
    await mongoose.connect(MONGODB_URI, clientOptions)
  } catch (error) {
    console.error(error)
    throw new Error('Failed to connect to MongoDB')
  }
}

const disconnect = async (): Promise<void> => {
  await mongoose.disconnect()
}

export {
  connect,
  disconnect
}
