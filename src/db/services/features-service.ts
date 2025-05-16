import { connect, disconnect } from '@/lib/db'
import { IFeature } from '@/types/interfaces'
import { Model } from 'mongoose'
import { Feature } from '../models/features'

const getFeatures = async (): Promise<IFeature[]> => {
  await connect()
  try {
    const features = await (Feature as Model<IFeature>).find().lean().exec()
    return features
  } catch (error) {
    console.error(error)
    return []
  } finally {
    await disconnect()
  }
}

const getFeatureById = async (featureId: string): Promise<IFeature | null> => {
  await connect()
  try {
    const feature = await (Feature as Model<IFeature>).findById(featureId).lean().exec()
    return feature
  } catch (error) {
    console.error(error)
    return null
  } finally {
    await disconnect()
  }
}

export {
  getFeatures,
  getFeatureById
}
