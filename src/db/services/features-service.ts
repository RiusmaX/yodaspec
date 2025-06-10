import { connect, disconnect } from '@/lib/db'
import { IProject } from '@/types/interfaces'
import { Model } from 'mongoose'
import Project from '../models/project'

// Récupérer toutes les fonctionnalités (features) de tous les projets
const getFeatures = async (): Promise<IProject['features']> => {
  await connect()
  try {
    const projects = await (Project as Model<IProject>).find({}).lean().exec()
    console.log('Projets récupérés:', projects)
    const features = projects.flatMap(project => (project.features != null) || [])
    console.log('Features récupérés:', features)
    return features
  } catch (error) {
    console.error('Erreur lors de la récupération des fonctionnalités:', error)
    return []
  } finally {
    await disconnect()
  }
}

// Récupérer une fonctionnalité spécifique par son ID
const getFeatureById = async (featureId: string): Promise<IProject['features'][number] | null> => {
  await connect()
  try {
    const project = await (Project as Model<IProject>).findOne({ 'features._id': featureId }).lean().exec()
    if (project == null) {
      console.error(`Aucun projet contenant la fonctionnalité avec l'ID ${featureId} trouvé.`)
      return null
    }
    const feature = ((project.features?.find(f => f._id.toString() === featureId)) != null) || null
    return feature
  } catch (error) {
    console.error('Erreur lors de la récupération de la fonctionnalité:', error)
    return null
  } finally {
    await disconnect()
  }
}

// Récupérer toutes les fonctionnalités d'un projet par son ID
const getFeaturesByProjectId = async (projectId: string): Promise<IProject['features'] | null> => {
  await connect()
  try {
    const project = await (Project as Model<IProject>).findById(projectId).lean().exec()
    if (project == null) {
      console.error(`Projet avec l'ID ${projectId} introuvable.`)
      return null
    }
    return (project.features != null) || []
  } catch (error) {
    console.error('Erreur lors de la récupération des fonctionnalités par projectId:', error)
    return null
  } finally {
    await disconnect()
  }
}

// Récupérer une fonctionnalité spécifique par projectId et featureId
const getFeatureByProjectIdAndFeatureId = async (projectId: string, featureId: string): Promise<IProject['features'][number] | null> => {
  await connect()
  try {
    const project = await (Project as Model<IProject>).findById(projectId).lean().exec()
    if (project == null) {
      console.error(`Projet avec l'ID ${projectId} introuvable.`)
      return null
    }
    const feature = ((project.features?.find(f => f._id.toString() === featureId)) != null) || null
    return feature
  } catch (error) {
    console.error('Erreur lors de la récupération de la fonctionnalité par projectId et featureId:', error)
    return null
  } finally {
    await disconnect()
  }
}

const updateSelectedFeatures = async (selection: IFeature[]): Promise<void> => {
  // exemple minimal : on écrase tout
  await Feature.deleteMany({})
  await Feature.insertMany(selection)
}

export {
  getFeatures,
  getFeatureById,
  getFeaturesByProjectId,
  getFeatureByProjectIdAndFeatureId,
  updateSelectedFeatures
}
