import mongoose, { ConnectOptions } from 'mongoose'

if (typeof process.env.MONGODB_USER_NAME !== 'string' || process.env.MONGODB_USER_NAME.length === 0) {
  throw new Error('MONGODB_USER_NAME is not difined')
}
if (typeof process.env.MONGODB_PASSWORD_NAME !== 'string' || process.env.MONGODB_PASSWORD_NAME.length === 0) {
  throw new Error('MONGODB_USER_NAME is not difined')
}
if (typeof process.env.MONGODB_HOST !== 'string' || process.env.MONGODB_HOST.length === 0) {
  throw new Error('MONGODB_USER_NAME is not difined')
}
if (typeof process.env.MONGODB_PARAM !== 'string' || process.env.MONGODB_PARAM.length === 0) {
  throw new Error('MONGODB_USER_NAME is not difined')
}
if (typeof process.env.MONGODB_DB_APP !== 'string' || process.env.MONGODB_DB_APP.length === 0) {
  throw new Error('MONGODB_USER_NAME is not difined')
}
const clientOption: ConnectOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true
  }
}
const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USER_NAME}:${process.env.MONGODB_PASSWORD_NAME}@${process.env.MONGODB_HOST}/${process.env.MONGODB_PARAM}&appName=${process.env.MONGODB_DB_APP}`

const connect = async (): Promise<void> => {
  if (typeof MONGODB_URI !== 'string' || MONGODB_URI.length === 0) {
    throw new Error('MONGODB_URI is not difined')
  }

  try {
    await mongoose.connect(MONGODB_URI, clientOption)
    console.log('connect mongoose')
  } catch (e) {
    throw new Error('Failed to connect')
  }
}
const disconnect = async (): Promise<void> => {
  await mongoose.disconnect()
}
export {
  connect,
  disconnect
}
