'use server'

import Project from '@/db/models/project'
import { IProject } from '@/types/interfaces'
import { revalidatePath } from 'next/cache'
import { connect, disconnect } from '@/lib/db'

// Création d'un nouveau projet dans la base de données
const createProject = async (project: IProject): Promise<void> => {
  await connect()
  const _project = new Project(project)
  await _project.save()
  revalidatePath('/')
  await disconnect()
}

// Mise à jour d'un projet existant avec de nouvelles données
const updateProject = async (project: IProject, data: IProject): Promise<void> => {
  console.log('Project :', project)
  console.log('Data :', data)
  await connect()
  // mettre à jour le projet
  await (Project as any).findOneAndUpdate({ _id: project._id }, data, {
    new: true,
    lean: true // ensures a plain JS object is returned
  })
  revalidatePath('/')
  await disconnect()
}

export {
  createProject,
  updateProject
}
