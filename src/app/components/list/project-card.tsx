import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { IProject } from '@/app/types/interfaces'
import { type ReactNode } from 'react'
import Link from 'next/link'

function ProjectCard ({ project }: Readonly<{ project: IProject }>): ReactNode {
  return (
    <Link href={`/project/${String(project._id)}`}>
      <Card className='w-full hover:cursor-pointer'>
        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-sm text-gray-500'>{project.description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

export default ProjectCard
