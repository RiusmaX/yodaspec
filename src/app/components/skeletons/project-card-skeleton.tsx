import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

function ProjectCardSkeleton (): React.ReactNode {
  return (
    <Card className='w-full'>
      <CardHeader>
        <Skeleton className='h-6 w-full' />
      </CardHeader>
      <CardContent>
        <Skeleton className='h-6 w-full' />
      </CardContent>
    </Card>
  )
}

export default ProjectCardSkeleton
