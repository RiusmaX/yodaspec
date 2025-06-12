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
 
    Ta mission est de produire une spécification fonctionnelle complète au format JSON pour la fonctionnalité suivante.
 
    Titre de la fonctionnalité : ${String(title)}
    Contexte du projet : ${String(context)}
 
    Tu dois structurer ta réponse uniquement au format JSON suivant, sans ajouter de texte en dehors :
 
    {
      "titreSpec": "Titre clair et concis de la fonctionnalité",
      "contexte": "Décris le cadre du projet, la situation actuelle, la provenance du besoin (interne/client/utilisateur final)",
      "objectifs": "Quels sont les objectifs métier ou utilisateurs visés par cette fonctionnalité ? À quoi sert-elle concrètement ?",
      "acteurs": "Liste les utilisateurs ou systèmes impliqués dans cette fonctionnalité",
      "description": "Explique la finalité principale de la fonctionnalité, les besoins couverts, son utilité dans le système global",
      "conditionsSucces": "Quels résultats permettent de considérer la fonctionnalité comme un succès ? (indicateurs, comportement attendu)",
      "preConditions": [
        "Liste les conditions nécessaires avant d'utiliser la fonctionnalité (accès, données existantes, permissions, dépendances)"
      ],
      "etapesFlux": [
        "Décris chaque étape du flux normal d'utilisation par l'utilisateur, ainsi que les actions attendues du système à chaque étape"
      ],
      "scenariosErreurs": [
        "Liste les erreurs possibles, leurs causes, et le comportement du système attendu (message, rollback, etc.)"
      ],
      "scenariosAlternatifs": "Décris les chemins alternatifs valides (paramètres différents, options, raccourcis, cas particuliers)",
      "reglesGestion": [
        "Énonce les règles métier, validations, contraintes de contenu ou de sécurité à respecter"
      ],
      "interfaceUxUi": "Précise les éléments d'interface concernés, les interactions utilisateur attendues, les contraintes UX ou design",
      "casTests": [
        "Décris quelques cas de test fonctionnels (cas standard, erreurs, cas limites)"
      ],
      "postCondition": [
        "Liste les états du système après exécution (données créées, modifiées, notifications, changements visibles)"
      ],
      "status": "draft"
    }
 
    Sois exhaustif, clair et professionnel. Aucune phrase hors format JSON ne doit apparaître. Toute réponse contennant plus d'une proposition, sépare les par des virgules et surtout pas en tableau de tableau.
    `

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [{ text: prompt }],
      config: { responseMimeType: 'application/json' }
    })

    const spec = JSON.parse(String(response.text))

    if (!project.step3) {
      project.step3 = []
    }
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
