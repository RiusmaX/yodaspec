import { GoogleGenAI } from '@google/genai'
import { CheckResult, IaCheckInput } from '@/types/interface'
import { CheckPrompts } from '@/prompt/step4/verify-context'

// Initialisation de l'API Google GenAI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
})

export const runIaChecks = async ({
  enrichedPrompt,
  features,
  specs
}: IaCheckInput): Promise<CheckResult[]> => {
  const context = createContext(enrichedPrompt, features, specs)

  const results: CheckResult[] = []

  for (const { label, template } of CheckPrompts) {
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

// Crée le contexte pour générer un prompt complet
function createContext (enrichedPrompt: string, features: string[], specs: any[]): string {
  return `
==== PROMPT ENRICHI ====
${enrichedPrompt}

==== FONCTIONNALITÉS ====
${features.map((f, i) => `${i + 1}. ${f}`).join('\n')}

==== SPÉCIFICATIONS ====
${JSON.stringify(specs, null, 2)}
`
}
