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

export const connect = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI, clientOptions)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log('Error connecting to MongoDB', error)
    throw new Error('Error connecting to MongoDB')
  }
}

export const disconnect = async (): Promise<void> => {
  try {
    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
  } catch (error) {
    console.log('Error disconnecting from MongoDB', error)
    throw new Error('Error disconnecting from MongoDB')
  }
}
