import { GoogleGenAI } from '@google/genai'
import { Feature, Spec } from '@/types/interface'
import { matchFeaturesPrompt } from '@/prompt/step4/match-features'
import { CheckContextPrompt } from '@/prompt/step4/check-context'

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

export const runAllIaChecks = async ({
  enrichedPrompt,
  features,
  specs
}: {
  enrichedPrompt: string
  features: Feature[]
  specs: Spec[]
}): Promise<Spec[]> => {
  let currentSpecs = specs

  // Étape 1 : valid_context / is_modified
  currentSpecs = await runCheckContext({ enrichedContext: enrichedPrompt, specs: currentSpecs })

  // Étape 2 : matched_features
  currentSpecs = await runMatchCheck({ features, specs: currentSpecs })

  // Tu pourras ajouter d'autres traitements ici si besoin (ex : clarté, lisibilité...)

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
