import { Button } from '@/components/ui/button'
import Stepper from '@/components/stepper'
import { getProjectById } from '@/db/services/project-service'
import Link from 'next/link'
import { redirect } from 'next/navigation'

async function ProjectHome (props: Readonly<{ params: Promise<{ projectId: string }> }>): Promise<React.ReactNode> {
  const { projectId } = await props.params

  const projectData = await getProjectById(projectId)

  if (projectData == null) {
    return redirect('/')
  }

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-2xl font-bold'>Project {projectData.title}</h1>
      <p className='text-sm text-fray-500'>{projectData.description}</p>
      <Button asChild>
        <Link href={`/project/${projectId}/step1`}>Aller à l'étape 1</Link>
      </Button>
      <Stepper />
      <h1 className='text-2xl font-bold'>Project {projectData.title}</h1>
      <p className='text-sm text-fray-500'>{projectData.description}</p>
    </div>
  )
}

export default ProjectHome
