import { ProjectCardListSkeleton } from '@/components/skeletons/project-card-skeleton'
function Loading (): React.ReactNode {
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      <ProjectCardListSkeleton />
    </div>
  )
}

export default Loading
