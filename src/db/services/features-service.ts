import { connect, disconnect } from '@/lib/db'
import { IProject, IFeature } from '@/types/interfaces'
import { Model } from 'mongoose'
import Project from '../models/project'

// Récupérer toutes les fonctionnalités (features) de tous les projets
const getFeatures = async (): Promise<IFeature[]> => {
  await connect()
  try {
    const projects = await (Project as Model<IProject>).find({}).lean().exec()
    // On récupère toutes les features de tous les projets, on filtre les undefined
    const features = projects.flatMap(project => project.features ?? [])
    return features
  } catch (error) {
    console.error('Erreur lors de la récupération des fonctionnalités:', error)
    return []
  } finally {
    await disconnect()
  }
}

// Récupérer une fonctionnalité spécifique par son ID
const getFeatureById = async (featureId: string): Promise<IFeature | null> => {
  await connect()
  try {
    const project = await (Project as Model<IProject>).findOne({ 'features._id': featureId }).lean().exec()
    if (project == null || !project.features) {
      console.error(`Aucun projet contenant la fonctionnalité avec l'ID ${featureId} trouvé.`)
      return null
    }
    // On cherche la feature par son _id (si elle existe)
    const feature = project.features.find(f => (f as any)._id && (f as any)._id.toString() === featureId)
    return feature ?? null
  } catch (error) {
    console.error('Erreur lors de la récupération de la fonctionnalité:', error)
    return null
  } finally {
    await disconnect()
  }
}

// Récupérer toutes les fonctionnalités d'un projet par son ID
const getFeaturesByProjectId = async (projectId: string): Promise<IFeature[]> => {
  await connect()
  try {
    const project = await (Project as Model<IProject>).findById(projectId).lean().exec()
    if (project == null || !project.features) {
      console.error(`Projet avec l'ID ${projectId} introuvable ou sans features.`)
      return []
    }
    return project.features
  } catch (error) {
    console.error('Erreur lors de la récupération des fonctionnalités par projectId:', error)
    return []
  } finally {
    await disconnect()
  }
}

// Récupérer une fonctionnalité spécifique par projectId et featureId
const getFeatureByProjectIdAndFeatureId = async (projectId: string, featureId: string): Promise<IFeature | null> => {
  await connect()
  try {
    const project = await (Project as Model<IProject>).findById(projectId).lean().exec()
    if (project == null || !project.features) {
      console.error(`Projet avec l'ID ${projectId} introuvable ou sans features.`)
      return null
    }
    const feature = project.features.find(f => (f as any)._id && (f as any)._id.toString() === featureId)
    return feature ?? null
  } catch (error) {
    console.error('Erreur lors de la récupération de la fonctionnalité par projectId et featureId:', error)
    return null
  } finally {
    await disconnect()
  }
}

// mettre à jour les features sélectionnées
const updateSelectedFeatures = async (selection: IFeature[]): Promise<void> => {
  
}

export {
  getFeatures,
  getFeatureById,
  getFeaturesByProjectId,
  getFeatureByProjectIdAndFeatureId,
  updateSelectedFeatures
}
