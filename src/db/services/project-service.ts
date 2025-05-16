import { connect, disconnect } from '@/lib/db'
import { Model } from 'mongoose'
import Project from '@/db/models/project'
import { IProject } from '@/types/interfaces'

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

const getProjectById = async (projectid: string): Promise<IProject | null> => {
  await connect()
  try {
    const project = await (Project as Model<IProject>).findById(projectid).lean().exec()
    return project
  } catch (error) {
    console.error('Error fetching project by ID:', error)
    return null
  } finally {
    await disconnect()
  }
}

export {
  getProjects,
  getProjectById
}
