import { getOneProject } from '@/db/services/project-service'
import { redirect } from 'next/navigation'

async function ProjectHome(props: Readonly<{ params: Promise<{ projectId: string }> }>): Promise<React.ReactNode> {
  const { projectId } = await props.params
  if (projectId === null || projectId === undefined) {
    redirect('/')
  }
  const project = await getOneProject(projectId)
  if (project === null) {
    redirect('/')
  }
  return (
    <div>
      <h1>project name</h1>
      <p>{projectId}</p>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
    </div>
  )
}

export default ProjectHome
