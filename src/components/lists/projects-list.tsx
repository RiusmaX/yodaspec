import Link from 'next/link'
import { IProject } from '../../types/interface'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

function ProjectCard ({ project }: Readonly<{ project: IProject }>): React.ReactNode {
  return (
    <Link href={`/project/${String(project._id)}`} className='w-full'>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        <CardContent />
      </Card>
    </Link>
  )
}

function ProjectsList ({ projects }: Readonly<{ projects: IProject[] }>): React.ReactNode {
  return (
    <div>
      <h2 className='text-2xl font-bold'>Liste des projets</h2>
      <p className='text-sm text-muted-foreground'>
        Voici la liste de tous vos projets. Vous pouvez les modifier ou les supprimer.
      </p>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>

    </div>
  )
}

export { ProjectsList, ProjectCard }
