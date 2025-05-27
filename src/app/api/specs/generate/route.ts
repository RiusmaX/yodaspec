// src/app/api/specs/generate/route.ts

import { connect, disconnect } from '@/lib/db'
import Project from '@/db/models/Project'
import { GoogleGenAI } from '@google/genai'
import { NextResponse } from 'next/server'
import { Types } from 'mongoose'

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
})

export async function POST (req: Request): Promise<Response> {
  try {
    const { projectId, title, context } = await req.json()

    if (!Types.ObjectId.isValid(projectId)) {
      return NextResponse.json({ error: 'ID de projet invalide' }, { status: 400 })
    }

    await connect()
    const project = await Project.findById(projectId)
    if (project === undefined || project === null) {
      return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 })
    }

    const prompt = `
      Tu es un expert en rédaction de spécifications fonctionnelles pour des projets web.
      Rédige une spécification complète au format JSON pour la fonctionnalité suivante :

    const titleString: string = title;
    Titre de la fonctionnalité : ${String(title)}
      Contexte du projet : ${String(context)}

      Réponds uniquement en JSON au format suivant :
      {
        "titreSpec": "...",
        "contexte": "...",
        "objectifs": "...",
        "acteurs": "...",
        "description": "...",
        "conditionsSucces": "...",
        "preConditions": "...",
        "etapesFlux": "...",
        "scenariosErreurs": "...",
        "scenariosAlternatifs": "...",
        "reglesGestion": "...",
        "interfaceUxUi": "...",
        "casTests": "...",
        "postCondition": "...",
        "status": "draft"
      }
    `

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [{ text: prompt }],
      config: { responseMimeType: 'application/json' }
    })

    const spec = JSON.parse(String(response.text))

    project.step3.push(spec)
    await project.save()

    return NextResponse.json({ message: 'Spec générée et enregistrée', spec })
  } catch (err) {
    console.error('Erreur lors de la génération :', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  } finally {
    await disconnect()
  }
}
