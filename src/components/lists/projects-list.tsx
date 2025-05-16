import { IProject } from '@/types/interfaces'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'

function ProjectCard ({ project }: Readonly<{ project: IProject }>): React.ReactNode {
  return (
    <Link href={`/project/${String(project._id)}`}>
      <Card className='max-w-[240px] hover:shadow-md transition-shadow duration-200 ease-in-out'>
        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{project.description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
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
