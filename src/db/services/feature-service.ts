import { connect, disconnect } from '@/lib/db'
import mongoose from 'mongoose'
import Feature from '@/db/models/feature'
import { Ifeature } from '@/types/interfaces'

const getFeatures = async (projectId: string): Promise<Ifeature[]> => {
  await connect()

  try {
    console.log('=== [getFeatures] DEBUG START ===')
    console.log('projectId reçu:', projectId)

    // Validation ObjectId
    const isValid = mongoose.Types.ObjectId.isValid(projectId)
    if (!isValid) {
      console.warn('Format ObjectId invalide:', projectId)
      return []
    }

    const objectId = new mongoose.Types.ObjectId(projectId)

    // Requête principale
    let features = await Feature.find({ idProject: objectId }).lean().exec()

    // Fallback : certains documents peuvent contenir un string
    if (features.length === 0) {
      console.warn('Aucune feature avec ObjectId. Essai avec string...')
      features = await Feature.find({ idProject: projectId }).lean().exec()
    }

    console.log('Features récupérées:', features.length)
    return []
  } catch (error) {
    console.error('[getFeatures] Erreur:', error)
    return []
  } finally {
    await disconnect()
  }
}

export { getFeatures }
