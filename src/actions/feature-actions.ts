'use server'
import Project from '@/db/models/project'
import { IFeature } from '@/types/interfaces'
import { revalidatePath } from 'next/cache'
import { connect, disconnect } from '@/lib/db'

const createFeature = async (feature: IFeature): Promise<void> => {
  await connect()
  const _feature = new Project(feature)
  await _feature.save()
  revalidatePath('/')
  await disconnect()
}

const updateSelectedFeatures = async (projectId: string, features: IFeature[]): Promise<void> => {
  await connect()
  try {
    await (Project as any).findByIdAndUpdate(
      projectId,
      { features, updatedAt: new Date() }
    )
    revalidatePath(`/project/${projectId}/features`)
  } finally {
    await disconnect()
  }
}

export {
  createFeature,
  updateSelectedFeatures
}
