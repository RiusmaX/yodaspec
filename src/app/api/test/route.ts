import { NextResponse } from 'next/server'
import { runMatchCheck } from '../../../db/services/check-services'
import { Feature, Spec } from '@/types/interface'

export async function GET (): Promise<NextResponse> {
  const features: Feature[] = [
    { title: 'Créer une tâche', description: 'Ajout d’une tâche avec titre et deadline.' },
    { title: 'Supprimer une tâche', description: 'Suppression via bouton.' },
    { title: 'Démarrer un timer', description: 'Chronomètre sur une tâche en cours.' }
  ]

  const specs: Spec[] = [
    {
      titre: 'Création de tâche',
      description: 'Formulaire pour créer une tâche avec titre, deadline.'
    },
    {
      titre: 'Suppression de tâche',
      description: 'Supprimer une tâche dans la liste.'
    },
    {
      titre: 'Affichage calendrier',
      description: 'Vue calendrier mensuelle des tâches.'
    }
  ]

  const result = await runMatchCheck({ features, specs })

  return NextResponse.json(result)
}
