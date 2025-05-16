import Project from '@/db/models/project'
import { IProject } from '@/types/interfaces'
import { revalidatePath } from 'next/cache'
import { connect, disconnect } from '@/lib/db'

const createProject = async (project: IProject): Promise<void> => {
  'use server'
  await connect()
  const _project = new Project(project)
  await _project.save()
  revalidatePath('/')
  await disconnect()
}

export {
  createProject
}
