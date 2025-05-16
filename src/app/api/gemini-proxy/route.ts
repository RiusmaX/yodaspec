import { connect, disconnect } from '@/lib/db'
import { GoogleGenAI, Type } from '@google/genai'
import { NextResponse } from 'next/server'

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
})

export async function GET (request: Request): Promise<NextResponse> {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: [
      {
        text: 'Invente une histoire complète dans le style des Kassos. Je veux le titre de l\'histoire, le contenu de l\'histoire et les personnages de l\'histoire dans le format demandé JSON. Je veux que l\'histoire longue complète et drôle. Le format de réponse doit être JSON comme ceci : { titre, histoire, personnages }.'
      }
    ],
    config: {
      responseMimeType: 'application/json'
      // responseSchema: {
      //   type: Type.OBJECT,
      //   properties: {
      //     title: {
      //       type: Type.STRING,
      //       description: 'Le titre de l\'histoire'
      //     },
      //     content: {
      //       type: Type.STRING,
      //       description: 'Le contenu de l\'histoire'
      //     },
      //     characters: {
      //       type: Type.ARRAY,
      //       description: 'Les personnages de l\'histoire',
      //       items: {
      //         type: Type.OBJECT,
      //         properties: {
      //           name: { type: Type.STRING, description: 'Le nom du personnage' },
      //           description: { type: Type.STRING, description: 'La description du personnage' }
      //         }
      //       }
      //     }
      //   }
      // }
    }
  })

  const result = JSON.parse(String(response.text) ?? '{}')

  return NextResponse.json(result)
}
