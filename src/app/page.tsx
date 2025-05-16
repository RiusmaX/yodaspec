import CreateProjectDialog from '@/components/dialogs/create-project-dialog'
import ProjectsList from '@/components/lists/projects-list'
import Project from '@/db/models/project'
import { connect } from '@/lib/db'
import { IProject } from '@/types/interfaces'
import { revalidatePath } from 'next/cache'
import { Model } from 'mongoose'

export default async function Home (): Promise<React.ReactNode> {
  await connect()
  const projects = await (Project as Model<IProject>).find().lean().exec()

  const createProject = async (project: IProject): Promise<void> => {
    'use server'
    const _project = new Project(project)
    await _project.save()
    revalidatePath('/')
  }

  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-[32px] row-start-2 items-center'>
        <CreateProjectDialog createProject={createProject} />
        <ProjectsList projects={projects} />
      </main>
    </div>
  )
}
