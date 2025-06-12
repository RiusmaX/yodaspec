import Project from '@/db/models/Project'
import { IProject, IStep3 } from '@/types/interfaces'
import { connect, disconnect } from '@/lib/db'
import { revalidatePath } from 'next/cache'

const createProject = async (project: IProject): Promise<void> => {
  'use server'
  await connect()
  const _project = new Project(project)
  await _project.save()
  revalidatePath('/')
  await disconnect()
}

const createSpec = async (projectId: string, spec: IStep3): Promise<void> => {
  await connect()

  // Mise à jour du projet existant en ajoutant la nouvelle spécification
  await Project.findByIdAndUpdate(
    projectId,
    { $push: { step3: spec } },
    { new: true, runValidators: true }
  )

  revalidatePath('/')
  await disconnect()
}

export {
  createProject,
  createSpec
}
