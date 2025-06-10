'use server'

import Project from '@/db/models/project'
import { IFeature } from '@/types/interfaces'
import { revalidatePath } from 'next/cache'
import { connect, disconnect } from '@/lib/db'

const addFeatureToProject = async (projectId: string, feature: IFeature): Promise<void> => {
  console.log('Adding feature to project:', { projectId, feature })
  try {
    await connect()

    await Project.findByIdAndUpdate(projectId, {
      $push: { features: feature },
      $set: { updatedAt: new Date() }
    })

    revalidatePath(`/project/${projectId}`)
  } catch (error) {
    console.error('Error adding feature:', error)
    throw new Error('Erreur lors de l\'ajout de la fonctionnalité')
  } finally {
    await disconnect()
  }
}

const updateFeatureInProject = async (
  projectId: string,
  featureIndex: number,
  updatedFeature: IFeature
): Promise<void> => {
  console.log('Updating feature in project:', { projectId, featureIndex, updatedFeature })
  try {
    await connect()

    await Project.findByIdAndUpdate(projectId, {
      $set: {
        [`features.${featureIndex}`]: updatedFeature,
        updatedAt: new Date()
      }
    })

    revalidatePath(`/project/${projectId}`)
  } catch (error) {
    console.error('Error updating feature:', error)
    throw new Error('Erreur lors de la modification de la fonctionnalité')
  } finally {
    await disconnect()
  }
}

const deleteFeatureFromProject = async (
  projectId: string,
  featureIndex: number
): Promise<void> => {
  console.log('Deleting feature from project:', { projectId, featureIndex })
  try {
    await connect()

    const project = await Project.findById(projectId)
    if (project && project.features) {
      project.features.splice(featureIndex, 1)
      project.updatedAt = new Date()
      await project.save()
    }

    revalidatePath(`/project/${projectId}`)
  } catch (error) {
    console.error('Error deleting feature:', error)
    throw new Error('Erreur lors de la suppression de la fonctionnalité')
  } finally {
    await disconnect()
  }
}

export {
  addFeatureToProject,
  updateFeatureInProject,
  deleteFeatureFromProject
}
