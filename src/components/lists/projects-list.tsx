import { IProject } from '@/types/interfaces'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

function ProjectCard ({ project }: Readonly<{ project: IProject }>): React.ReactNode {
  return (
    <Card className='max-w-[320px]'>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{project.description}</CardDescription>
      </CardContent>
    </Card>
  )
}

function ProjectList ({ projects }: Readonly<{ projects: IProject[] }>): React.ReactElement {
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-2xl font-bold'>Projets</h1>
      <div className=' grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {
            projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))
        }
      </div>
    </div>
  )
}

export default ProjectList
