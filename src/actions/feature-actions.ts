import Project from '@/db/models/project'
import { IFeature } from '@/types/interfaces'
import { revalidatePath } from 'next/cache'
import { connect, disconnect } from '@/lib/db'

const createFeature = async (feature: IFeature): Promise<void> => {
  'use server'
  await connect()
  const _feature = new Project(feature)
  await _feature.save()
  revalidatePath('/')
  await disconnect()
}

export {
  createFeature
}
