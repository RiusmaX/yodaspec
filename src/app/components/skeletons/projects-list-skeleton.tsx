import ProjectCardSkeleton from './project-card-skeleton'

function ProjectListSkeleton ({ count = 4 }: Readonly<{ count: number }>): React.ReactNode {
  return (
    <div className='flex flex-col gap-4 w-full'>
      <h1 className='text-xl font-bold'>Projets</h1>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full'>
        {Array.from({ length: count }).map((_, index) => (
          <ProjectCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    </div>
  )
}

export default ProjectListSkeleton
