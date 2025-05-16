import { getProjectById } from '@/db/services/project-service'
import { redirect } from 'next/navigation'

async function ProjectHome (props: Readonly<{ params: Promise<{ projectId: string }> }>): Promise<React.ReactNode> {
  const { projectId } = await props.params
  const project = await getProjectById(projectId)

  if (project == null) {
    return redirect('/')
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <h1 className='text-2xl font-bold'>Project {project.title}</h1>
      <p className='text-sm text-gray-500'>{project.description}</p>
    </div>
  )
}

export default ProjectHome
