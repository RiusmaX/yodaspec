import Project from '@/db/models/project'
import { connect, disconnect } from '@/lib/db'
import { IProject } from '@/types/interfaces'
import { Model } from 'mongoose'

const getProjects = async (): Promise<IProject[]> => {
  await connect()
  try {
    const projects = await (Project as Model<IProject>).find().lean().exec()
    return projects
  } catch (error) {
    console.error(error)
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
    console.error(error)
    return null
  } finally {
    await disconnect()
  }
}

export {
  getProjects,
  getProjectById
}
