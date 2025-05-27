// src/app/api/specs/route.ts

import { connect, disconnect } from '@/lib/db'
import Project from '@/db/models/Project'
import { Types } from 'mongoose'

export async function POST (req: Request): Promise<Response> {
  console.log('Requête reçue sur /api/specs') // <= AJOUTE ÇA
  try {
    const { projectId, spec } = await req.json()
    console.log('ID reçu:', projectId)

    if (!Types.ObjectId.isValid(projectId)) {
      return new Response(JSON.stringify({ error: 'ID de projet invalide' }), { status: 400 })
    }

    await connect()
    console.log('Connexion à la base de données réussie')
    const project = await Project.findById(projectId)
    if (project === undefined || project === null) {
      return new Response(JSON.stringify({ error: 'Projet non trouvé' }), { status: 404 })
    }

    project.step3.push(spec)
    await project.save()

    return new Response(JSON.stringify({ message: 'Spec ajoutée', project }), { status: 200 })
  } catch (error) {
    console.error('Erreur dans /api/specs:', error) // <= AJOUTE ÇA

    console.error(error)
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), { status: 500 })
  } finally {
    await disconnect()
  }
}
