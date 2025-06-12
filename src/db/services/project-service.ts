import { connect, disconnect } from '@/lib/db'
import { IProject } from '@/types/interfaces'
import { Model } from 'mongoose'
import Project from '../models/project'

const getProjects = async (): Promise<IProject[]> => {
  await connect()
  try {
    const projects = await (Project as Model<IProject>).find({}).lean().exec()

    return projects.map(project => ({
      ...project,
      _id: project._id.toString(),
      features: Array.isArray(project.features) ? project.features : []
    }))
  } catch (error) {
    console.error(error)
    return []
  } finally {
    await disconnect()
  }
}

const getProjectById = async (id: string): Promise<IProject | null> => {
  await connect()
  try {
    const project = await (Project as Model<IProject>).findById(id).lean().exec() // ✅ Ajout de .lean()

    if (project == null) return null

    return {
      ...project,
      _id: project._id.toString()
    }
  } catch (error) {
    console.error(error)
    return null
  } finally {
    await disconnect()
  }
}

export { getProjects, getProjectById }
