import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
function ProjectCardSkeleton (): React.ReactNode {
  return (

    <Card className='w-[240px]'>
      <CardHeader>
        <CardTitle>
          <Skeleton className='h-12 w-12 rounded-full' />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton className='h-12 w-12 rounded-full' />
      </CardContent>
    </Card>
  )
}
function ProjectCardListSkeleton ({ count = 4 }: Readonly<{ count?: number }>): React.ReactNode {
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {
          Array.from({ length: count }).map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))
        }
    </div>
  )
}
export {
  ProjectCardListSkeleton,
  ProjectCardSkeleton
}
