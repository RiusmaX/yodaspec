'use server'

import { createHash } from 'crypto'
import { getProjectById, updateProjectStep4 } from '@/db/services/project-services'
import { runAllIaChecks } from '@/db/services/check-services'
import { Spec, ValidatedSpec } from '@/types/interface'

function hashJson (data: any): string {
  return createHash('md5').update(JSON.stringify(data)).digest('hex')
}

export const verifiedSpecAction = async (projectId: string): Promise<{
  hasAnyModification: boolean
  enrichedSpecs: ValidatedSpec[]
}> => {
  const project = await getProjectById(projectId)
  if (project == null) throw new Error('Projet introuvable')

  const originalSpecs: Spec [] = project.step3 ?? []
  const validatedSpecs: ValidatedSpec[] = await runAllIaChecks(projectId)

  let hasAnyModification = false

  const enrichedSpecs = validatedSpecs.map((spec, i) => {
    const original = originalSpecs[i]
    const isModified = hashJson(original) !== hashJson(spec)

    if (isModified) hasAnyModification = true

    return {
      ...spec,
      is_modified: isModified
    }
  })

  await updateProjectStep4(projectId, enrichedSpecs)

  return {hasAnyModification, enrichedSpecs}
}
