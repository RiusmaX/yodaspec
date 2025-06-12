import { getProjectById } from '@/db/services/project-service'
import { Suspense } from 'react'
import Loading from '@/app/loading'
import SpecificationsList from '@/component/list/specifications-list'
import BackButton from '@/components/ui/BackButton'
 
// Page affichant la liste des spécifications fonctionnelles d'un projet
export default async function FunctionalSpecsPage (
  props: Readonly<{ params: Promise<{ projectId: string }> }>
): Promise<React.ReactNode> {
   // Récupération de l'identifiant du projet depuis les paramètres d'URL
  const { projectId } = await props.params
  // Récupération des données du projet depuis la base de données
  const project = await getProjectById(projectId)
  // Récupération des spécifications fonctionnelles (étape 3) ou tableau vide si non défini
  const specifications = project?.step3 ?? []
 
  return (
    <div className='flex justify-center items-center min-h-screen p-8'>
      {/* Bouton pour revenir en arrière, positionné en haut à gauche */}
      <div className="absolute left-4 top-4">
        <BackButton />
      </div>
      <main className='w-full max-w-3xl rounded-xl shadow-lg p-8 flex flex-col gap-8'>
        {/* En-tête avec titre et description du projet */}
        <div className='w-full flex flex-col items-center mb-6'>
          <h1 className='text-3xl font-extrabold text-center mb-2'>
            {project?.title ?? 'Titre du projet'}
          </h1>
          <p className='text-base text-gray-700 text-center mb-4'>
            {project?.description ?? 'Description du projet...'}
          </p>
        </div>
        {/* Liste des spécifications fonctionnelles, affichée avec un fallback de chargement */}
        <Suspense fallback={<Loading />}>
          <SpecificationsList specifications={specifications} />
        </Suspense>
      </main>
    </div>
  )
}