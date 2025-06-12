'use server'

import { createHash } from 'crypto'
import { getEnrichedPromptById } from '@/db/services/prompt-services'
import { getFeaturesById } from '@/db/services/feature-services'
import { getSpecById } from '@/db/services/spec-services'

import { runAllIaChecks } from '@/db/services/check-services' // ✅ uniquement cette fonction ici

import { Feature, Spec } from '@/types/interface'

// 🔁 Hash JSON pour détecter les modifications
function hashJson(data: any): string {
  return createHash('md5').update(JSON.stringify(data)).digest('hex')
}

export const verifiedSpecAction = async (projectId: string): Promise<boolean> => {
  const enrichedPrompt = await getEnrichedPromptById(projectId)
  const features: Feature[] = await getFeaturesById(projectId)
  const specs: Spec[] = await getSpecById(projectId)

  const updatedSpecs = await runAllIaChecks({ enrichedPrompt, features, specs })

  let isModified = false
  const modifiedSpecs = []

  for (let i = 0; i < specs.length; i++) {
    const originalSpec = specs[i]
    const newSpec = updatedSpecs[i]

    const hashBefore = hashJson(originalSpec)
    const hashAfter = hashJson(newSpec)

    if (hashBefore !== hashAfter) {
      isModified = true
      modifiedSpecs.push({
        index: i,
        originalSpec,
        updatedSpec: newSpec,
        hashBefore,
        hashAfter
      })
    }
  }

  await saveVerifiedSpec({
    projectId,
    verifiedSpecs: updatedSpecs,
    isModified,
    modifiedSpecs
  })

  return isModified
}
