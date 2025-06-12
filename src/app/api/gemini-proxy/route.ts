import { connect } from '@/lib/db'
import { step1Prompt } from '@/prompts/step1-prompt'
import { IProject } from '@/types/interfaces'
import { GoogleGenAI, Type } from '@google/genai'
import { NextResponse } from 'next/server'
 
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
})
 
export async function POST (request: Request): Promise<NextResponse> {
  await connect()
  const formData = await request.json() as IProject['step1']
 
  if (formData === null || formData === undefined) {
    throw new Error('Données du formulaire requises')
  }
 
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: [
      {
        text: step1Prompt(formData)
      }
    ],
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          final_introduction: {
            type: Type.STRING,
            description: 'Introduction complète du cahier des charges'
          }
        }
      }
    }
  })
  const result = JSON.parse(String(response.text))

  return NextResponse.json(result)
}
