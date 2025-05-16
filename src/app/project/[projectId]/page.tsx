import { getProjectById } from '@/db/services/project-service'
import { redirect } from 'next/navigation'

async function ProjectHome (props: Readonly<{ params: Promise<{ projectId: string }> }>): Promise<React.ReactNode> {
  const { projectId } = await props.params

  const project = getProjectById(projectId)

  if (project === null) {
    return redirect('/')
  }

  return (
    <div>
      <h1> Projet home </h1>
      <p> {projectId}</p>
    </div>
  )
}

export default ProjectHome
