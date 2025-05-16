import { IProject } from '@/types/interfaces'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'

function ProjectCard ({ project }: Readonly<{ project: IProject }>): React.ReactNode {
  return (
    <Link href={`/project/${String(project._id)}`}>
      <Card className='w-[240px] hover:shadow-md transition-all duration-200'>
        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-sm text-gary-500'>{project.description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

function ProjectsList ({ projects }: Readonly<{ projects: IProject[] }>): React.ReactNode {
  console.log(projects)
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-2xl font-bold'>Projets</h2>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {
                projects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))
            }
      </div>
    </div>
  )
}

export default ProjectsList
