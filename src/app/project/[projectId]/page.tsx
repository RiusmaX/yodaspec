import { getProjectById } from '@/db/services/project-service'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import CreateSpecDialog from '@/component/dialogs/create-spec-dialogs'

async function ProjectHome (props: Readonly<{ params: Promise <{ projectId: string }> }>): Promise<React.ReactNode> {
  const { projectId } = await props.params

  const project = await getProjectById(projectId)

  if (project === null) {
    return redirect('/')
  }

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-2xl font-bold'>Project {project.title}</h1>
      <p className='text-sm text-gray-500'>{project.description}</p>
      {(project._id != null) && (
        <Link href={`/features/step3/${String(project._id)}`}>
          <Button variant='outline'>
            Afficher les spécifications
          </Button>
        </Link>

      )}

      <CreateSpecDialog projectId={String(project._id)} />

    </div>
  )
}

export default ProjectHome
