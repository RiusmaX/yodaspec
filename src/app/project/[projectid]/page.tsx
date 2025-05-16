import { getProjectById } from '@/db/services/project-services'
import { redirect } from 'next/navigation'

async function ProjectHome (props: Readonly<{ params: Promise<{ projectid: string }> }>): Promise<React.ReactElement> {
  const { projectid } = await props.params
  const project = await getProjectById(projectid)
  if (project == null) {
    return redirect('/')
  }

  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
        <h1 className='text-3xl font-bold'>Projet : {project.title}</h1>
        <p className='text-lg'>{project.description}</p>
      </main>
    </div>
  )
}

export default ProjectHome
