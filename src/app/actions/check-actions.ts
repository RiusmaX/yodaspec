'use server'

import { createHash } from 'crypto'
import { getEnrichedPromptById, getFeaturesById, getSpecById, saveVerifiedSpec } from '@/db/services/project-services'
import { runCheckContext } from '@/db/services/check-services'
import { Feature, Spec } from '@/types/interface'

function hashJson(data: any): string {
  return createHash('md5').update(JSON.stringify(data)).digest('hex')
}

export const verifiedSpecAction = async (projectId: string): Promise<boolean> => {
  const enrichedPrompt = await getEnrichedPromptById(projectId)
  const features: Feature[] = await getFeaturesById(projectId)
  const specs: Spec[] = await getSpecById(projectId)

  const updatedSpecs = await runCheckContext({ enrichedContext: enrichedPrompt, specs })

  let isModified = false
  const modifiedSpecs = []

  for (let i = 0; i < specs.length; i++) {
    const originalSpec = specs[i]
    const newSpec = updatedSpecs[i]

    const hashBefore = hashJson(originalSpec)
    const hashAfter = hashJson(newSpec)

    if (hashBefore !== hashAfter) {
      isModified = true
      modifiedSpecs.push({ index: i, originalSpec, updatedSpec: newSpec, hashBefore, hashAfter })
    }
  }

  await saveVerifiedSpec({ projectId, verifiedSpecs: updatedSpecs, isModified, modifiedSpecs })

  return isModified
}
