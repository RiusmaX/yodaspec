import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { IProject } from '@/app/types/interfaces'
import { type ReactNode } from 'react'

function ProjectCard ({ project }: Readonly<{ project: IProject }>): ReactNode {
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-sm text-gray-500'>{project.description}</p>
      </CardContent>
    </Card>
  )
}

export default ProjectCard
