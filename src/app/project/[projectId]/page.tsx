import { Button } from '@/components/ui/button'
import Stepper from '@/components/stepper'
import { getProjectById } from '@/db/services/project-service'
import Link from 'next/link'
import { redirect } from 'next/navigation'

async function ProjectHome (props: Readonly<{ params: { projectId: string } }>): Promise<React.ReactNode> {
  const params = await props.params
  const { projectId } = params

  const project = await getProjectById(projectId)

  if (project == null) {
    return redirect('/')
  }

  return (
    <div className='flex flex-col gap-4'>
      <Stepper />
      <h1 className='text-2xl font-bold'>Project {project.title}</h1>
      <p className='text-sm text-fray-500'>{project.description}</p>
      <Button asChild>
        <Link href={`/project/${projectId}/step1`}>Aller à l'étape 1</Link>
      </Button>
    </div>
  )
}

export default ProjectHome
