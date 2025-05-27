'use server'

import { createHash } from 'crypto'
import {
  getEnrichedPromptById,
  getFeaturesById,
  getSpecById,
  saveVerifiedSpec
} from '@/db/services/project-services'

import { runMatchCheck } from '../../db/services/check-services'
import { Feature, Spec } from '../../types/interface'

function hashJson (data: any): string {
  const jsonString = JSON.stringify(data)
  return createHash('md5').update(jsonString).digest('hex')
}

export const verifiedSpecAction = async (projectId: string): Promise<boolean> => {
  const enrichedPrompt = await getEnrichedPromptById(projectId)
  const features: Feature[] = await getFeaturesById(projectId)
  const specs: Spec[] = await getSpecById(projectId)

  const result = await runMatchCheck({ features, specs })

  let isModified = false
  const modifiedSpecs = []

  for (let i = 0; i < specs.length; i++) {
    const originalSpec = specs[i]
    const updatedSpec = result[i]

    const hashBefore = hashJson(originalSpec)
    const hashAfter = hashJson(updatedSpec)

    if (hashBefore !== hashAfter) {
      isModified = true
      modifiedSpecs.push({
        index: i,
        originalSpec,
        updatedSpec,
        hashBefore,
        hashAfter
      })
    }
  }

  await saveVerifiedSpec({
    projectId,
    verifiedSpecs: result,
    isModified,
    modifiedSpecs
  })

  return isModified
}
