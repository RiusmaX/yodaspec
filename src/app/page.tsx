import CreateProjectDialog from '@/components/dialogs/create-project-dialog'
import Project from '@/db/models/project'
import { connect } from '@/lib/db'
import { IProject } from '@/types/interfaces'

export default function Home (): React.ReactNode {
  const createProject = async (project: IProject): Promise<void> => {
    'use server'
    await connect()
    const _project = new Project(project)
    await _project.save()
  }
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
        <CreateProjectDialog createProject={createProject} />
      </main>
    </div>
  )
}
