import { getProjectById } from '@/db/services/project-service'
import { Suspense } from 'react'
import Loading from '@/app/loading'
import SpecificationsList from '@/component/list/specifications-list'

export default async function FunctionalSpecsPage (
  props: Readonly<{ params: Promise<{ projectId: string }> }>
): Promise<React.ReactNode> {
  const { projectId } = await props.params
  const project = await getProjectById(projectId)
  const specifications = project?.step3 ?? []

  return (
    <div className='flex justify-center items-center min-h-screen p-8'>
      <main className='w-full max-w-3xl rounded-xl shadow-lg p-8 flex flex-col gap-8'>
        <div className='w-full flex flex-col items-center mb-6'>
          <h1 className='text-3xl font-extrabold text-center mb-2'>
            {project?.title ?? 'Titre du projet'}
          </h1>
          <p className='text-base text-gray-700 text-center mb-4'>
            {project?.description ?? 'Description du projet...'}
          </p>
        </div>
        <Suspense fallback={<Loading />}>
          <SpecificationsList specifications={specifications} />
        </Suspense>
      </main>
    </div>
  )
}
