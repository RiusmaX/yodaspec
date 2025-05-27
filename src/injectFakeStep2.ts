import { connect, disconnect } from '@/lib/db'
import Project from '@/db/models/Project'

async function injectFakeStep2 (projectId: string): Promise<void> {
  await connect()

  const faussesDonneesStep2 = {
    title: 'Afficher les places dans le stade',
    description: "Permet de savoit ou se situent les places de l'utilisateur dans le stade"
  }

  await Project.updateOne(
    { _id: projectId },
    { $set: { step2: faussesDonneesStep2 } }
  )

  await disconnect()
  console.log('Fake step2 inséré pour le projet', projectId)
}

// Remplace 'ID_DE_TON_PROJET_ICI' par l'id réel de ton projet
injectFakeStep2('ID_DE_TON_PROJET_ICI').catch(console.error)
