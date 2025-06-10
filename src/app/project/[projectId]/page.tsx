import SpecData from '@/components/dataTable/specData'
import { getProjectById } from '@/db/services/project-service'
import { redirect } from 'next/navigation'

async function ProjectHome (props: Readonly<{ params: { projectId: string } }>): Promise<React.ReactNode> {
  const params = await props.params
  const { projectId } = params

  const project = await getProjectById(projectId)

  if (project == null) {
    return redirect('/')
  }

  return (
    <SpecData project={project} projectId={projectId} />
  )
}

export default ProjectHome
