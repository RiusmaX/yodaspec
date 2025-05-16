import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

function ProjectCardSkeleton (): React.ReactNode {
  return (
    <Card className='w-[250px]'>
      <CardHeader>
        <CardTitle>
          <Skeleton className='h-4 w-[200px]' />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton className='h-4 w-[200px]' />
      </CardContent>
    </Card>
  )
}

function ProjectsListSkeleton ({ count = 4 }: Readonly<{ count?: number }>): React.ReactNode {
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {Array.from({ length: count }).map((_, index) => (
        <ProjectCardSkeleton key={index} />
      ))}
    </div>
  )
}

export {
  ProjectCardSkeleton,
  ProjectsListSkeleton

}
