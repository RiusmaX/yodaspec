import { GoogleGenAI } from '@google/genai'
import { Feature, Spec, Step1, Step2, Step3 } from '@/types/interface'
import { matchFeaturesPrompt } from '@/prompt/step4/match-features'
import { CheckContextPrompt } from '@/prompt/step4/check-context'
import { coverageFeaturesPrompt } from '@/prompt/step4/coverage-features'
import { similarSpecsPrompt } from '@/prompt/step4/similar-specs'
import { verifySpecStructurePrompt } from '@/prompt/step4/check-format'
import { getProjectById } from './project-services'

// Initialisation de l'API Google GenAI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
})

const getResponse = async ({ prompt }: { prompt: string }): Promise<Spec[]> => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: [{ text: prompt }],
    config: {
      responseMimeType: 'application/json'
    }
  })

  try {
    return JSON.parse(response.text ?? '[]')
  } catch (err) {
    console.error('Erreur de parsing JSON IA :', response.text)
    throw new Error('Réponse IA invalide (non-JSON ou mal formée)')
  }
}

// Fonction principale d'appel aux différents traitements

export const runAllIaChecks = async (projectId: string): Promise<Spec[]> => {
  const project = await getProjectById(projectId)
  if (project == null) throw new Error('Projet introuvable')

  const enrichedPrompt = (project.step1 as Step1)?.enrichedPrompt ?? ''
  const features: Feature[] = (project.step2 as Step2)?.features ?? []
  const specs: Spec[] = (project.step3 as Step3)?.specs ?? []

  let currentSpecs = specs
  // Étape 1 : valid_context / is_modified
  currentSpecs = await runCheckContext({ enrichedContext: enrichedPrompt, specs: currentSpecs })

  // Étape 2 : matched_features
  currentSpecs = await runMatchCheck({ features, specs: currentSpecs })
  // Étape 3 : coverage_features
  currentSpecs = await runCoverageCheck({ features, specs: currentSpecs })
  // Étape 4 : similar_specs
  currentSpecs = await runSimilarCheck({ specs: currentSpecs })
  // Étape 5 : verify_spec_structure
  currentSpecs = await runStructureCheck({ specs: currentSpecs })

  return currentSpecs
}

// Fonction pour vérifier la cohérence des spécifications avec le contexte enrichi
export const runCheckContext = async ({
  enrichedContext,
  specs
}: {
  enrichedContext: string
  specs: Spec[]
}): Promise<Spec[]> => {
  const prompt = CheckContextPrompt(enrichedContext, specs)
  return await getResponse({ prompt })
}

// Fonction pour vérifier la correspondance des fonctionnalités avec les spécifications
export const runMatchCheck = async ({
  features,
  specs
}: {
  features: Feature[]
  specs: Spec[]
}): Promise<Spec[]> => {
  const prompt = matchFeaturesPrompt(features, specs)

  return await getResponse({ prompt })
}

// Fonction pour vérifier que chaque spec couvre au moins une fonctionnalité
export const runCoverageCheck = async ({
  features,
  specs
}: {
  features: Feature[]
  specs: Spec[]
}): Promise<Spec[]> => {
  const prompt = coverageFeaturesPrompt(features, specs)

  return await getResponse({ prompt })
}

// Fonction pour vérifier qu'il n'y ai pas de redondance
export const runSimilarCheck = async ({
  specs
}: {
  specs: Spec[]
}): Promise<Spec[]> => {
  const prompt = similarSpecsPrompt(specs)

  return await getResponse({ prompt })
}

// Fonction pour vérifier la structure du json
export const runStructureCheck = async ({
  specs
}: {
  specs: Spec[]
}): Promise<Spec[]> => {
  const prompt = verifySpecStructurePrompt(specs)

  return await getResponse({ prompt })
}
