import { IProject } from '@/app/types/interfaces'
import { connect } from '@/lib/db'
import Project from '../models/project'
import { Model } from 'mongoose'

const getProjects = async (): Promise<IProject[]> => {
  await connect()
  try {
    const projects = await (Project as Model<IProject>).find().lean().exec()
    return projects
  } catch (error) {
    return []
  }
}

export { getProjects }
