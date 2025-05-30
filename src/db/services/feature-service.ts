// @/db/services/getFeatures.ts
import mongoose from 'mongoose'
import { connect, disconnect } from '@/lib/db'
import Feature from '@/db/models/feature'
import { Ifeature } from '@/types/interfaces'

const getFeatures = async (projectId: string): Promise<Ifeature[]> => {
  await connect()
  try {
    const isValid = mongoose.Types.ObjectId.isValid(projectId)
    if (!isValid) {
      console.warn('projectId invalide:', projectId)
      return []
    }

    const objectId = new mongoose.Types.ObjectId(projectId)
    let features = await Feature.find({ idProject: objectId }).lean().exec()

    if (features.length === 0) {
      features = await Feature.find({ idProject: projectId }).lean().exec()
    }

    return features
  } catch (error) {
    console.error('Erreur getFeatures:', error)
    return []
  } finally {
    await disconnect()
  }
}

export { getFeatures }
