'use server'

import { createHash } from 'crypto'
import {
  getEnrichedPromptById,
  getFeaturesById,
  getSpecById,
  saveVerifiedSpec
} from '@/db/services/project-services'
import { runIaCheck } from '../'

function hashJson(data: any): string {
  const jsonString = JSON.stringify(data)
  return createHash('md5').update(jsonString).digest('hex')
}

export const verifiedSpecAction = async (projectId: string): Promise<boolean> => {
  const enrichedPrompt = await getEnrichedPromptById(projectId)
  const features = await getFeaturesById(projectId)
  const specs = await getSpecById(projectId)

  const hashBefore = hashJson(specs)

  const result = await runIaCheck({
    enrichedPrompt,
    expectedFeatures: features,
    currentSpecs: specs
  })

  const hashAfter = hashJson(result)
  const isModified = hashBefore !== hashAfter

  await saveVerifiedSpec({
    projectId,
    verifiedSpecs: result,
    isModified,
    hashBefore,
    hashAfter
  })

  return isModified
}
