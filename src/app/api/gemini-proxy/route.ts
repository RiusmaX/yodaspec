import { GoogleGenAI } from '@google/genai'
import { NextResponse } from 'next/server'
import { connect } from '../../../lib/db'
import { testPrompt1 } from '@/prompt/test-prompt'

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
})

export async function GET (request: Request): Promise<NextResponse> {
  await connect()

  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: [
      {
        text: testPrompt1
      }
    ],
    config: {
      responseMimeType: 'application/json'

    }
  })

  const result = await JSON.parse(String(response.text))

  return NextResponse.json(result)
}
