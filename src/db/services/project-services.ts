import { IProject, ValidatedSpec } from '@/types/interface'
import { connect, disconnect } from '@/lib/db'
import Project from '@/db/models/project'
import { Model } from 'mongoose'

const getProjects = async (): Promise<IProject[]> => {
  await connect()
  try {
    const projects = await (Project as Model<IProject>).find().lean().exec()
    return projects
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  } finally {
    await disconnect()
  }
}

const getProjectById = async (projectId: string): Promise<IProject | null> => {
  await connect()
  try {
    const project = await (Project as Model<IProject>).findById(projectId).lean().exec()
    return project
  } catch (error) {
    console.error('Error fetching project by ID:', error)
    return null
  } finally {
    await disconnect()
  }
}

const updateProjectStep4 = async (projectId: string, validatedSpecs: ValidatedSpec[]): Promise<void> => {
  await connect()
  try {
    await (Project as Model<IProject>).findByIdAndUpdate(projectId, {
      $set: {
        step4: validatedSpecs,
        updatedAt: new Date()
      }
    }).exec()
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la step4 :', error)
    throw new Error('Échec de la mise à jour de la step4')
  } finally {
    await disconnect()
  }
}

export {
  getProjects,
  getProjectById,
  updateProjectStep4

}
