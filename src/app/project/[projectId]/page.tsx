import { getOneProject } from '@/db/services/project-service'
import { redirect } from 'next/navigation'
import Loading from './loading'
import { Suspense } from 'react'

async function ProjectHome (props: Readonly<{ params: Promise<{ projectId: string }> }>): Promise<React.ReactNode> {
  const { projectId } = await props.params
  const project = await getOneProject(projectId)
  if (project === null) {
    redirect('/')
  }
  return (
    <div className='flex flex-col p-5 w-screen h-screen items-center justify-center'>
      <Suspense fallback={<Loading />}>
        <h2 className='text-2xl font-bold'>{project.title}</h2>
        <p className='text-sm text-gray-500'>{project.description}</p>
      </Suspense>

    </div>
  )
}

export default ProjectHome
