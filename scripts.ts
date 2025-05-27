import { runMatchCheck } from './src/db/services/check-services'
import { Feature, Spec } from './src/types/interface'

async function main (): Promise<void> {
  const features: Feature[] = [
    { title: 'Créer une tâche', description: 'L’utilisateur peut créer une tâche avec un formulaire.' },
    { title: 'Supprimer une tâche', description: 'L’utilisateur peut supprimer une tâche avec un bouton.' },
    { title: 'Démarrer un timer', description: 'L’utilisateur peut lancer un chronomètre sur une tâche.' }
  ]

  const specs: Spec[] = [
    {
      titre: 'Création de tâche',
      description: 'Permet de créer une tâche avec un titre et une deadline.'
    },
    {
      titre: 'Suppression de tâche',
      description: 'L’utilisateur peut supprimer une tâche depuis la liste.'
    },
    {
      titre: 'Affichage calendrier',
      description: 'Les tâches s’affichent dans un calendrier mensuel.'
    }
  ]

  const enriched = await runMatchCheck({ features, specs })

  console.log('📋 Résultat enrichi des spécifications :')
  console.dir(enriched, { depth: null })
}

await main()
