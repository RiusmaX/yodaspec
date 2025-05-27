import { GoogleGenAI } from '@google/genai'
import { IaCheckResult, IaCheckInput, Feature, Spec, enrichedContext } from '@/types/interface'
import { CheckContextPrompt, verifyContextPrompt } from '@/prompt/step4/check-context'
import { matchFeaturesPrompt } from '@/prompt/step4/match-features'

// Initialisation de l'API Google GenAI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
})

export const runIaChecks = async ({
  enrichedPrompt,
  features,
  specs
}: IaCheckInput): Promise<IaCheckResult[]> => {
  const context = createContext(enrichedPrompt, features, specs)

  const results: IaCheckResult[] = []

  for (const { label, template } of verifyContextPrompt) {
    const promptText = template(context)

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [{ text: promptText }],
      config: {
        responseMimeType: 'text/plain'
      }
    })

    results.push({
      promptLabel: label,
      response: response.text || ''
    })
  }

  return results
}

export const runMatchCheck = async ({
  features,
  specs
}: {
  features: Feature[]
  specs: Spec[]
}): Promise<Spec[]> => {
  const prompt = matchFeaturesPrompt(features, specs)

  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: [{ text: prompt }],
    config: {
      responseMimeType: 'application/json'
    }
  })

  return JSON.parse(response.text || '[]')
}

export const runCheckContext = async ({
  enrichedContext,
  specs
}: {
  enrichedContext: string
  specs: Spec[]
}): Promise<Spec[]> => {
  const prompt = CheckContextPrompt(enrichedContext, specs)

  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: [{ text: prompt }],
    config: {
      responseMimeType: 'application/json'
    }
  })

  return JSON.parse(response.text || '[]')
}
