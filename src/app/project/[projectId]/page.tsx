import { Table } from '@/components/ui/table'
import { getProjectById } from '@/db/services/project-service'
import { redirect } from 'next/navigation'

async function ProjectHome (props: Readonly<{ params: { projectId: string } }>): Promise<React.ReactNode> {
  const params = await props.params
  const { projectId } = params

  const project = await getProjectById(projectId)

  if (project == null) {
    return redirect('/')
  }

  const features = project.features ?? [] // Correction de la logique

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <h1 className='text-2xl font-bold'>Project {project.title}</h1>
      <p className='text-sm text-gray-500'>{project.description}</p>
      <a
        href={`/project/${projectId}/features`}
        className='inline-block px-6 py-2 mt-4 text-white bg-secondary rounded-lg hover:bg-secondary/70 transition'
      >
        Spécifications fonctionnelles
      </a>
      <Table className='min-w-full mt-8'>
        <thead>
          <tr>
            <th className='px-4 py-2 border'>Feature</th>
            <th className='px-4 py-2 border'>Description</th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr key={index}>
              <td className='px-4 py-2 border'>{feature.feature}</td>{/* Utiliser feature.feature */}
              <td className='px-4 py-2 border'>{feature.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default ProjectHome
