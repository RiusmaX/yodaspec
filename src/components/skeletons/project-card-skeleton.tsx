import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

function ProjectCardSkeleton (): React.ReactNode {
  return (
    <Card className='max-w-[240px]'>
      <CardHeader>
        <CardTitle><Skeleton className='h-4 w-[200px]' /></CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription><Skeleton className='h-4 w-[200px]' /></CardDescription>
      </CardContent>
    </Card>

  )
}

function ProjectListSkeleton ({ count = 4 }: Readonly<{ count?: number }>): React.ReactNode {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:grid-cols-4'>
      {
        Array.from({ length: count }, (_, index) => (
          <ProjectCardSkeleton key={index} />
        ))
      }
    </div>
  )
}
export {
  ProjectCardSkeleton,
  ProjectListSkeleton
}
