import { getProjectById } from '@/db/services/project-service'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import CreateSpecDialog from '@/component/dialogs/create-spec-dialogs'
import BackButton from '@/components/ui/BackButton'
 
// Page de détails d'un projet spécifique
async function ProjectHome (props: Readonly<{ params: Promise <{ projectId: string }> }>): Promise<React.ReactNode> {
  // Récupération de l'identifiant du projet depuis les paramètres d'URL
  const { projectId } = await props.params
 
  // Récupération des données du projet
  const project = await getProjectById(projectId)
 
  // Si le projet n'existe pas, redirige vers la page d'accueil
  if (project === null) {
    return redirect('/')
  }
 
  return (
    // Conteneur principal centré avec bouton retour en haut à gauche
    <div className="relative flex items-center justify-center min-h-screen">
      <div className="absolute left-4 top-4">
        <BackButton />
      </div>
      <div className='flex items-center justify-center flex-col gap-4'>
        {/* Titre et description du projet */}
        <h1 className='text-2xl font-bold'>Project {project.title}</h1>
        <p className='text-sm text-gray-500'>{project.description}</p>
        {/* Lien vers la page des spécifications si l'id du projet existe */}
        {(project._id != null) && (
          <Link href={`/features/step3/${String(project._id)}`}>
            <Button variant='outline'>
              Afficher les spécifications
            </Button>
          </Link>
        )}
        {/* Composant pour générer une nouvelle spécification */}
        <CreateSpecDialog projectId={String(project._id)} projectTitle={project.title} projectDescription={project.description} />
      </div>
    </div>
  )
}
 
export default ProjectHome