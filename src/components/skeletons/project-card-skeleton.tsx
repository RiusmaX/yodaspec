import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

function ProjectCardSkeleton (): React.ReactNode {
  return (
    <Card className='w-[300px] '>
      <CardHeader>
        <CardTitle>
          <Skeleton className='h-6 w-[200px]' />
        </CardTitle>
        <CardDescription>
          <Skeleton className='h-4 w-[200px]' />
        </CardDescription>
      </CardHeader>
      <CardContent />
    </Card>

  )
}

function ProjectsListSkeleton ({ count = 4 }: Readonly<{ count?: number }>): React.ReactNode {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {
      Array.from({ length: count }).map((_, index) => (
        <ProjectCardSkeleton key={index} />
      ))
}
    </div>
  )
}

export { ProjectCardSkeleton, ProjectsListSkeleton }
