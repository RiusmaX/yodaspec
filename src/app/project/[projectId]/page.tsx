import Stepper from '@/components/stepper'
import { ContextForm } from '@/components/forms/context-form'
import { getProjectById } from '@/db/services/project-service'
import { redirect } from 'next/navigation'

async function ProjectHome (props: Readonly<{ params: Promise<{ projectId: string }> }>): Promise<React.ReactNode> {
  const { projectId } = await props.params

  const projectData = await getProjectById(projectId)

  if (projectData == null) {
    return redirect('/')
  }

  // Sérialisation de l'objet MongoDB en objet simple
  const project = JSON.parse(JSON.stringify(projectData))

  return (
    <div className='flex flex-col gap-4'>
      <Stepper />
      <h1 className='text-2xl font-bold'>Project {project.title}</h1>
      <p className='text-sm text-fray-500'>{project.description}</p>
      <ContextForm project={project} />
    </div>
  )
}

export default ProjectHome
