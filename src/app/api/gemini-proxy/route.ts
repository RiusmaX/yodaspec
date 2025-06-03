import { IProject } from '@/types/interfaces'
import { GoogleGenAI, Type } from '@google/genai'
import { NextResponse } from 'next/server'

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
})

const generatePrompt = (title: string, description: string): string => {
  return `Génère une liste de fonctionnalités dans l'ordre de priorité décroissante pour un projet du nom de "${title}" et qui va permettre de faire "${description}". Chaque fonctionnalité doit être décrite en une phrase concise.`
}

export async function POST (request: Request): Promise<NextResponse> {
  try {
    const body: { title: string, description: string } = await request.json()
    const { title, description } = body

    const prompt = generatePrompt(title, description)
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [
        {
          text: prompt
        }
      ],
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          description: 'Liste des fonctionnalités du projet',
          items: {
            type: Type.OBJECT,
            properties: {
              feature: {
                type: Type.STRING,
                description: 'Le nom de la fonctionnalité'
              },
              description: {
                type: Type.STRING,
                description: 'La description détaillée de la fonctionnalité'
              }
            },
            required: ['feature', 'description']
          }
        }
      }
    })

    const responseText = String(response.text)
    const features: IProject['features'] = JSON.parse(responseText)

    if ((features == null) || !Array.isArray(features)) {
      console.error('Erreur : La réponse de l\'API ne contient pas de fonctionnalités valides.', { response: responseText })
      return NextResponse.json({ error: 'Aucune fonctionnalité générée ou format de réponse invalide.' }, { status: 500 })
    }

    return NextResponse.json(features)
  } catch (error) {
    console.error('Erreur lors de la requête ou du parsing JSON:', error)
    return NextResponse.json({ error: 'Failed to fetch features' }, { status: 500 })
  }
}
