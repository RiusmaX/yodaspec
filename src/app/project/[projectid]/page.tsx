import { getProjectById } from '@/db/services/project-service'
import { redirect } from 'next/navigation'

async function ProjectHome (props: Readonly<{ params: Promise<{ projectid: string }> }>): Promise<React.ReactNode> {
  const { projectid } = await props.params
  if (projectid === null || projectid === undefined) {
    redirect('/')
  }
  const project = await getProjectById(projectid)
  if (project === null) {
    redirect('/')
  }
  return (
    <div>
      <h1>projectname</h1>
      <p>{projectid}</p>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
    </div>
  )
}

export default ProjectHome
